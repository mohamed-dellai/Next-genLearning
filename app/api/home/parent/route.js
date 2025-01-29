import { NextResponse } from "next/server";
import { deleteGiftChosen, insertGiftChosen } from "../../../../lib/homeQuerys";

export async function POST(request) {
    const { user_id, url, points, name } = await request.json();
    try {
        const result = await insertGiftChosen(user_id, url, points, name);
        return NextResponse.json(result, { status: 200 });
    } catch (error) {
        console.error("Error adding gift:", error);
        return NextResponse.json({ error: "Failed to add gift" }, { status: 500 });
    }
}

export async function DELETE(request) {
    const { id } = await request.json();
    try {
        const result = await deleteGiftChosen(id);
        return NextResponse.json(result, { status: 200 });
    } catch (error) {
        console.error("Error deleting gift:", error);
        return NextResponse.json({ error: "Failed to delete gift" }, { status: 500 });
    }
}

