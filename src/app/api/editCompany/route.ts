import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/connectDB';
import Company from '@/models/Company.models';

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const data = await req.json();

    const { name, sector, description, stockPrice, esgScore } = data;

    if (!name) {
      return NextResponse.json({ error: 'Company name is required to find the record.' }, { status: 400 });
    }

    // Find company by name
    const company = await Company.findOne({ name });

    if (!company) {
      return NextResponse.json({ error: 'Company not found.' }, { status: 404 });
    }

    // Update only provided fields (validate if needed)
    if (sector !== undefined) company.sector = sector;
    if (description !== undefined) company.description = description;
    if (stockPrice !== undefined) company.stockPrice = stockPrice;
    if (esgScore !== undefined) {
      if (esgScore < 0 || esgScore > 100) {
        return NextResponse.json({ error: 'esgScore must be between 0 and 100.' }, { status: 400 });
      }
      company.esgScore = esgScore;
    }

    await company.save();

    return NextResponse.json({ message: 'Company updated successfully.', company }, { status: 200 });
  } catch (error) {
    console.error('Error updating company:', error);
    return NextResponse.json({ error: 'Failed to update company.' }, { status: 500 });
  }
}
