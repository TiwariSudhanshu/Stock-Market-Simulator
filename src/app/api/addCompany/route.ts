import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/connectDB';
import Company from '@/models/Company.models';

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const data = await req.json();

    // Validate required fields according to your schema
    if (
      !data.name ||
      !data.sector ||
      !data.description ||
      typeof data.stockPrice !== 'number' ||
      typeof data.esgScore !== 'number'
    ) {
      return NextResponse.json(
        { error: 'name, sector, description, stockPrice, and esgScore are required with correct types.' },
        { status: 400 }
      );
    }

    // Validate ESG score range (0-100)
    if (data.esgScore < 0 || data.esgScore > 100) {
      return NextResponse.json({ error: 'esgScore must be between 0 and 100.' }, { status: 400 });
    }

    // Create new company document
    const company = new Company({
      name: data.name,
      sector: data.sector,
      description: data.description,
      stockPrice: data.stockPrice,
      esgScore: data.esgScore,
    });

    await company.save();

    return NextResponse.json({ message: 'Company added successfully.', company }, { status: 201 });
  } catch (error) {
    console.error('Error adding company:', error);
    return NextResponse.json({ error: 'Failed to add company.' }, { status: 500 });
  }
}
