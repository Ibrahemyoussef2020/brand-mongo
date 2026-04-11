const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../components/home/dynamic/GridSection.tsx');
let content = fs.readFileSync(filePath, 'utf8');

// Add Swiper imports
if (!content.includes('import { Swiper')) {
    content = content.replace(
        "import { faCartArrowDown } from '@fortawesome/free-solid-svg-icons';",
        "import { faCartArrowDown } from '@fortawesome/free-solid-svg-icons';\nimport { Swiper, SwiperSlide } from 'swiper/react';\nimport { Grid } from 'swiper/modules';\nimport 'swiper/css';\nimport 'swiper/css/grid';"
    );
}

// Ensure the condition is updated from home-consumer checks to actionButtonType
content = content.replace(
    /section\.key === 'home-consumer' \|\| section\.key === 'home-outdoor'/g, 
    "config.actionButtonType === 'show-details'"
);


const targetStartStr = `            <div style={{ 
                display: 'grid', 
                gridTemplateColumns: \`repeat(\${config.layout?.columns || 5}, 1fr)\`,
                gap: '25px',
                maxWidth: '1400px',
                margin: '0 auto',
                padding: '0 30px'
            }}>`;
            
const targetEndStr = `                }
            </div>
        </section>`;

let divStart = content.indexOf(targetStartStr);
let sectEnd = content.indexOf(targetEndStr);

if (divStart !== -1 && sectEnd !== -1) {
    const loopInnerStartStr = "products.map((product: any) => {\n                        return (";
    let innerStart = content.indexOf(loopInnerStartStr) + loopInnerStartStr.length;
    let innerEnd = content.lastIndexOf("                        )", sectEnd);

    let productCardCode = content.substring(innerStart, innerEnd).trim();

    const displayLogic = `
            {config.displayType === 'one-line' ? (
                <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 30px', overflow: 'hidden' }}>
                    <Swiper
                        slidesPerView={2}
                        spaceBetween={15}
                        breakpoints={{
                            640: { slidesPerView: 3 },
                            1024: { slidesPerView: config.layout?.columns || 5 }
                        }}
                    >
                        {products.map((product: any) => (
                            <SwiperSlide key={product.static_id} style={{height: 'auto', display: 'flex'}}>
                                ${productCardCode}
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            ) : config.displayType === 'two-line' ? (
                <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 30px', overflow: 'hidden' }}>
                    <Swiper
                        modules={[Grid]}
                        slidesPerView={2}
                        grid={{ rows: 2, fill: 'row' }}
                        spaceBetween={15}
                        breakpoints={{
                            640: { slidesPerView: 3, grid: { rows: 2, fill: 'row' } },
                            1024: { slidesPerView: config.layout?.columns || 5, grid: { rows: 2, fill: 'row' } }
                        }}
                    >
                        {products.map((product: any) => (
                            <SwiperSlide key={product.static_id} style={{height: 'auto', display: 'flex', marginTop: '15px'}}>
                                ${productCardCode}
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            ) : (
                <div style={{ 
                    display: 'grid', 
                    gridTemplateColumns: \`repeat(\${config.layout?.columns || 5}, 1fr)\`,
                    gap: '25px',
                    maxWidth: '1400px',
                    margin: '0 auto',
                    padding: '0 30px'
                }}>
                    {products.map((product: any) => (
                        ${productCardCode}
                    ))}
                </div>
            )}
        </section>`;

    content = content.substring(0, divStart) + displayLogic + content.substring(sectEnd + targetEndStr.length);
    fs.writeFileSync(filePath, content, 'utf8');
    console.log("SUCCESS!");
} else {
    console.log("FAILED to find marks");
}
