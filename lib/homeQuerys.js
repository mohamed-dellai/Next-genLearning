import { query } from "./db";

export async function addHobbies(hobbies, user) {
    try {
        const res = await query('UPDATE users SET hobies = $1 WHERE id = $2 RETURNING hobies', [hobbies, user]);
        return res.rows[0].hobbies;
    } catch (error) {
        console.error("Error updating hobbies:", error);
        throw new Error("Failed to update hobbies");
    }
}

export async function addPeref(peref, user) {
    try {
        const res = await query('UPDATE users SET pereference = $1 WHERE id = $2 RETURNING pereference', [peref, user]);
        return res.rows[0].pereference;
    } catch (error) {
        console.error("Error updating preferences:", error);
        throw new Error("Failed to update preferences");
    }
}

export async function addAge(age, user) {
        try {
        const res = await query('UPDATE users SET age = $1 WHERE id = $2 RETURNING age', [age, user]);
        return res.rows[0].age;
    } catch (error) {
        console.error("Error updating age:", error);
        throw new Error("Failed to update age");
    }
}

export async function addName(name, user) {
    try {
        const res = await query('UPDATE users SET user_name = $1 WHERE id = $2 RETURNING user_name', [name, user]);
        return res.rows[0].user_name;
    } catch (error) {
        console.error("Error updating name:", error);
        throw new Error("Failed to update name");
    }
}

export async function getGiftTemplates() {
    try {
        const res = await query('select id,name,url,points from g_templates');
        return res.rows;
    } catch (error) {
        console.error("Error getting gift template:", error);
        throw new Error("Failed getting gift template:");
    }  
}
export async function getSelectedGifts() {
    try {
        const res = await query('select id,name,url,points from public."gifts-chosen"');
        return res.rows;
    } catch (error) {
        console.error("Error getting gifts:", error);
        throw new Error("Failed getting gifts:");
    }  
}
export async function postGift(arrayOfgifts,user_id){
  try{
    for(let i=0;i<arrayOfgifts.length;i++){
       
            var res=await query('insert into public."gifts-chosen"(user_id,url,points,name) values($1,$2,$3,$4)',[user_id,arrayOfgifts[i].url,arrayOfgifts[i].points,arrayOfgifts[i].name])
            
        }
        
    }
   catch(error){
        console.error("Error inserting gift:", error);
        throw new Error("Failed inserting gift template:");
    }
    return res.rows
}

export async function getPereference(userid){
    try{
        var res=await query('SELECT COUNT(*) AS gifts,(SELECT age FROM users WHERE id = $1) AS age FROM  "gifts-chosen" g WHERE g.user_id = $1;',[userid])
        return res.rows[0]
    }   
    catch(error){
        throw new Error("Failed getting gift and age:");
    }
}
export async function getPoints(userid){
    try{
        var res=await query('select points from users where id=$1',[userid])
        return res.rows[0]
    }
    catch(err){
        throw new Error(err)
    }
}
export async function addRequestedGifts(userid,gifts){
    for(let i=0;i<gifts[i].length;i++){
    try{
        var res=await query('insert into requested_gifts(user_id,gift_id) values($1,$2)',[userid,gifts[i]])
    }
    catch(err){
        throw new Error(err)
    }
}
return true
}

export async function getChapterData(courseId,chapterId){
    try{
        var res=await query('select title,content,image from chapters where $1=course_id and $2=id',[courseId,chapterId])
        return res.rows[0]
    }
    catch(error){
        throw new Error(error)
    }
}
export async function getQuizes(chapter_id){
    try{
        var res=await query('select id, question, options, correctAnswer , (select user_answer from answers a where a.question_id=q.id) as answer from quizzes q where chapter_id=$1',[chapter_id])
        return res.rows
    }
    catch(e){
        console.log(e)
        throw new Error(e)
    }
}

export async function getAllChaptersIds(user,course){
    var res = await query(`
        SELECT 
            c.id AS "chapter_id", 
            q.id AS "quiz_id" 
        FROM 
            chapters c, 
            courses co, 
            quizzes q 
        WHERE 
            co.user_id = $1 
            AND c.course_id = $2 
            AND c.course_id = co.id 
            AND q.chapter_id = c.id;`, 
        [user, course]);    return res.rows
}

export async function postAnswer(id, answer, user) { 
    try {
        const res = await query(`
            INSERT INTO answers (user_id, question_id, user_answer, is_correct, created_at) 
            VALUES ($1, $2, $3, 
                (SELECT CASE WHEN correctanswer = $3 THEN true ELSE false END FROM quizzes WHERE id = $2), 
                NOW())
        `, [user, id, answer]);
        return res;
    } catch (e) {
        throw new Error(e);
    }
}

export async function addCourse(user,title,description){
    try{
        const res = await query(`
        INSERT INTO courses (user_id, title, description) 
        VALUES ($1, $2, $3)
        RETURNING id
    `, [user, title, description]);
        return res.rows[0].id;
    }
    catch(e){
        console.error("Error adding course:", e);
     throw new Error(e)
    }

}

export async function addChapter(courseId,chapterTitle,chapterContent){
    try{
        const res=await query('insert into chapters(course_id,title,content) values($1,$2,$3) RETURNING id',[courseId,chapterTitle,chapterContent])
        return res.rows[0].id
    }
    catch(e){
        console.error("Error adding chapter:", e);
        throw new Error(e)
    }
}

export async function addQuiz(chapterId,question,options,correctAnswer){
    console.log(options)
    try{
        const optionsArray = JSON.stringify(options).replace('[', '{').replace(']', '}');
        const res=await query('insert into quizzes(chapter_id,question,options,correctAnswer) values($1,$2,$3,$4) RETURNING id',[chapterId,question,optionsArray,correctAnswer])
        return res.rows[0].id
    }
    catch(e){
        console.error("Error adding quiz:", e);
        throw new Error(e)
    }
}