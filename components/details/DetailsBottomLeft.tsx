'use client'

import { ProductProps } from "@/types"
import { useState } from "react";
import DetailsBottomNav from "./DetailsBottomNav";
import Image from "next/image";

interface props{
    product:ProductProps,
    
}

const DetailsBottomLeft = ({product}:props) => {
    const [selected,setSelected] = useState<string>('desc');
  return (
    <div className="left">
        <DetailsBottomNav product={product} selected={selected} setSelected={setSelected} />

        {
            selected === 'desc' ? <div className="component">
            <p className="details">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.  Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, 
                Quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
            </p>

            <div className="table">
                <div className="row">
                    <div className="ceil-right">
                        <h3>Model</h3>
                    </div>
                    <div className="ceil-left">
                        <p>#8786867</p>
                    </div>
                </div>
                <div className="row">
                    <div className="ceil-right">
                        <h3>Style</h3>
                    </div>
                    <div className="ceil-left">
                        <p>Classic style</p>
                    </div>
                </div>
                <div className="row">
                    <div className="ceil-right">
                        <h3>Certificate</h3>
                    </div>
                    <div className="ceil-left">
                        <p>ISO-898921212</p>
                    </div>
                </div>
                <div className="row">
                    <div className="ceil-right">
                        <h3>Size</h3>
                    </div>
                    <div>
                        <p>34mm x 450mm x 19mm</p>
                    </div>
                </div>
                <div className="row">
                    <div className="ceil-right">
                        <h3>Memory</h3>
                    </div>
                    <div className="ceil-left">
                        <p>36GB RAM</p>
                    </div>
                </div>
            </div>

            <div className="features">
                <article className="feature">
                    <Image
                        src='/images/icons/check.png'
                        alt=""
                        width={20}
                        height={20}
                    />
                    <p>Some great feature name here</p>
                </article>
                <article className="feature">
                    <Image
                        src='/images/icons/check.png'
                        alt=""
                        width={20}
                        height={20}
                    />
                    <p>Lorem ipsum dolor sit amet, consectetur </p>
                </article>
                <article className="feature">
                    <Image
                        src='/images/icons/check.png'
                        alt=""
                        width={20}
                        height={20}
                    />
                    <p>Duis aute irure dolor in reprehenderit</p>
                </article>
                <article className="feature">
                    <Image
                        src='/images/icons/check.png'
                        alt=""
                        width={20}
                        height={20}
                    />
                    <p>Some great feature name here</p>
                </article>
            </div>

        </div>
        : <div><h2>Page Not Ready</h2></div>
        }
    </div>
  )
}

export default DetailsBottomLeft