import { NextRequest, NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import path from 'path';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();

    // Extract form fields
    const studentData = {
      firstName: formData.get('firstName') as string,
      lastName: formData.get('lastName') as string,
      email: formData.get('email') as string,
      phone: formData.get('phone') as string,
      dateOfBirth: formData.get('dateOfBirth') as string,
      nationality: formData.get('nationality') as string,
      currentEducationLevel: formData.get('currentEducationLevel') as string,
      institution: formData.get('institution') as string,
      fieldOfStudy: formData.get('fieldOfStudy') as string,
      desiredProgram: formData.get('desiredProgram') as string,
      desiredCountry: formData.get('desiredCountry') as string,
      password: formData.get('password') as string,
      agreeToTerms: formData.get('agreeToTerms') === 'true',
    };

    // Validate required fields
    const requiredFields = [
      'firstName',
      'lastName',
      'email',
      'phone',
      'dateOfBirth',
      'nationality',
      'currentEducationLevel',
      'institution',
      'fieldOfStudy',
      'desiredProgram',
      'desiredCountry',
      'password',
    ];

    for (const field of requiredFields) {
      if (!studentData[field as keyof typeof studentData]) {
        return NextResponse.json(
          { error: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }

    if (!studentData.agreeToTerms) {
      return NextResponse.json(
        { error: 'You must agree to the terms and conditions' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(studentData.email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      );
    }

    // Process uploaded documents
    const documents = formData.getAll('documents[]') as File[];
    const uploadedFiles: string[] = [];

    if (documents.length === 0) {
      return NextResponse.json(
        { error: 'At least one document is required' },
        { status: 400 }
      );
    }

    // Create uploads directory if it doesn't exist
    const uploadsDir = path.join(process.cwd(), 'public', 'uploads', 'students');
    
    for (const file of documents) {
      if (file.size > 0) {
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        // Generate unique filename
        const timestamp = Date.now();
        const safeFileName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
        const fileName = `${timestamp}_${safeFileName}`;
        const filePath = path.join(uploadsDir, fileName);

        // Save file
        await writeFile(filePath, buffer);
        uploadedFiles.push(`/uploads/students/${fileName}`);
      }
    }

    // TODO: Save student data to database
    // Example with Prisma:
    // const student = await prisma.student.create({
    //   data: {
    //     ...studentData,
    //     documents: uploadedFiles,
    //     password: await hashPassword(studentData.password),
    //   },
    // });

    // TODO: Send welcome email
    // await sendWelcomeEmail(studentData.email, studentData.firstName);

    // For now, return success response
    return NextResponse.json(
      {
        success: true,
        message: 'Registration successful! Check your email for confirmation.',
        data: {
          email: studentData.email,
          name: `${studentData.firstName} ${studentData.lastName}`,
          documentsUploaded: uploadedFiles.length,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      {
        error: 'Registration failed. Please try again.',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

// GET endpoint to check if email already exists
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get('email');

    if (!email) {
      return NextResponse.json(
        { error: 'Email parameter is required' },
        { status: 400 }
      );
    }

    // TODO: Check database for existing email
    // const exists = await prisma.student.findUnique({
    //   where: { email },
    // });

    // For now, return mock response
    const exists = false;

    return NextResponse.json({
      exists,
      available: !exists,
    });
  } catch (error) {
    console.error('Email check error:', error);
    return NextResponse.json(
      { error: 'Failed to check email availability' },
      { status: 500 }
    );
  }
}
