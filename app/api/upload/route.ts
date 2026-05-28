import { NextRequest, NextResponse } from 'next/server';
import cloudinary from '@/lib/cloudinary';

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      );
    }

    // convert file to buffer
    const bytes = await file.arrayBuffer();

    const buffer = Buffer.from(bytes);

    // convert buffer to base64
    const base64 = `data:${file.type};base64,${buffer.toString('base64')}`;

    // upload to cloudinary
    const uploadedImage = await cloudinary.uploader.upload(base64, {
      folder: 'products',
    });

    return NextResponse.json({
      success: true,

      image: {
        url: uploadedImage.secure_url,
        public_id: uploadedImage.public_id,
      },

      message: 'Image uploaded successfully',
    });

  } catch (error: any) {
    console.error('Error uploading image:', error);

    return NextResponse.json(
      {
        error: error.message || 'Upload failed',
      },
      { status: 500 }
    );
  }
}