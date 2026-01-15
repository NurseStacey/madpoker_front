export default function TodayDate(){
    let today=new Date()
    const month = today.getMonth() + 1; // getMonth() is 0-indexed
    const date = today.getDate();
    const year = today.getFullYear();
    
    return `${year}-${month}-${date}`;
}

