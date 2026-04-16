import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';
import { existsSync } from 'fs';

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    // Convert file to buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Create uploads directory if it doesn't exist
    const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
    if (!existsSync(uploadsDir)) {
      await mkdir(uploadsDir, { recursive: true });
    }

    // Generate unique filename
    const timestamp = Date.now();
    const originalName = file.name.split('.')[0];
    const extension = file.name.split('.').pop();
    const filename = `${originalName}-${timestamp}.${extension}`;

    // Save file to public/uploads
    const filepath = path.join(uploadsDir, filename);
    await writeFile(filepath, buffer);

    // Return the image path relative to public folder
    const imagePath = `/uploads/${filename}`;

    return NextResponse.json({ 
      success: true, 
      imagePath: imagePath,
      message: 'Image uploaded successfully' 
    });
  } catch (error: any) {
    console.error('Error uploading image:', error);
    return NextResponse.json({ error: (error as Error).message || String(error) }, { status: 500 });
  }
}
