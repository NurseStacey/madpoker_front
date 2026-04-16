export default function TodayDate(){

    let date=new Date()
    let offset = date.getTimezoneOffset() * 60000
    let localDate = new Date(date.getTime() - offset);
    console.log(localDate.toISOString().split('T')[0])
    
    return localDate.toISOString().split('T')[0];
}

