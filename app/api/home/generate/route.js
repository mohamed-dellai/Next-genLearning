import { NextResponse } from 'next/server';
import generate from '../../../../lib/generateCourse';
import {addCourse,addChapter,addQuiz} from '../../../../lib/homeQuerys';
export async function POST(request) {
    try {
        const data = await request.json();
        const user = request.cookies.get('user-id').value;
        var chapterId=-2
        if (!user) {
            return NextResponse.json({ error: "User not authenticated" }, { status: 401 });
        }

        const result = await generate(data.description, data.sectionCount, "adventure");
        const courseId=await addCourse(user,result.Coursetitle,data.description)
        for(let i=0;i<result.courseChapters.length;i++){

            chapterId=await addChapter(courseId,result.courseChapters[i].chapterTitle,result.courseChapters[i].chapterContent)
            for(let j=0;j<result.courseChapters[i].chapterQuizzes.length;j++){
            await addQuiz(chapterId,   result.courseChapters[i].chapterQuizzes[j].quizQuestion   ,  result.courseChapters[i].chapterQuizzes[j].quizOptions , result.courseChapters[i].chapterQuizzes[j].correctOption)
            }
        }
        return NextResponse.json({
            result: courseId,
        }, { status: 200 });

    } catch (error) {
        console.error("Error in POST request:", error);
        return NextResponse.json({ error: "Failed to generate" }, { status: 500 });
    }
}
