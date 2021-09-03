const axios = require('axios');
var fs = require('fs');
let readlineSync = require("readline-sync");
axios.get("http://saral.navgurukul.org/api/courses").then(resp => {
    Data=resp.data
    // const obj = JSON.parse(Data); 
    let json = JSON.stringify(Data,null,4);
    // console.log(typeof json); 
    // console.log(json);
    // let file=JSON.stringify(json,null,4)
    fs.writeFileSync("cources.JSON",json)
    console.log("")
    console.log("** Welcome to navgurukul and Learn basic programming launguage **")
    console.log("")
    serial_no = 0
    for (i of Data["availableCourses"]){
        console.log(`${serial_no+1}` ,i["name"], i["id"])
        serial_no++
    }
    var available_Courses =readlineSync.question("Enter your courses number that you want to learn:- ")
    parent_id=Data["availableCourses"][available_Courses-1]["id"]
    console.log(Data["availableCourses"][available_Courses-1]["name"])
    axios.get("http://saral.navgurukul.org/api/courses/" + (Data["availableCourses"][available_Courses - 1]["id"]) + "/exercises").then(resp => {
        Data_1 = resp.data;
        let json_1 = JSON.stringify(Data_1,null,4)
        // let file_1=JSON.stringify(json_1,null,4)
        fs.writeFileSync("parentes.JSON", json_1)        
        var serial_no_1=0
        for (i of Data_1["data"]){
            console.log("      ",serial_no_1+1,".",i["name"])
            if (i["childExercises"].length>0){
                var s=0
                for (j of i['childExercises']){
                    s++
                    console.log( "               ",s,j['name'])
                }
            }
            else{
                console.log("                1",i["slug"])
            }
            serial_no_1++
        }
        console.log("")
        var topic_no =readlineSync.question ("Enter topic number that's you want to learn:- ");
        var m = 0
        var my_list=[]
        while (m <(Data_1["data"][topic_no-1]["childExercises"].length)){
            console.log("     ", m+1 ,Data_1["data"][topic_no-1]["childExercises"][m]["name"])
            slug = (Data_1["data"][topic_no-1]["childExercises"][m]["slug"])
            m++
        }
        axios.get("http://saral.navgurukul.org/api/courses/" + (parent_id) +"/exercise/getBySlug?slug=" + slug).then(resp => {
            Data_2 = resp.data;
            let json_2 = JSON.stringify(Data_2,null,4)
            // let file_2=JSON.stringify(json_2)
            fs.writeFileSync("Topic.JSON", json_2)
            my_list.push(Data_2["content"])
            var questions_no = readlineSync.question ("choose the specific questions no :- ")
            question=questions_no-1
            console.log(my_list[question])
            // while (questions_no > 0 ){

            // }
        });
    });
});
 
// console.log("")
// var topic_no =readlineSync.question ("Enter topic number that's you want to learn:- ")
// var serial_no_3= 0
// var my_list=[]
// for (l in data_1['data']){
//     serial_no_3++
//     if (topic_no == serial_no_3){
//     }
// }
//         user_input_3=input("Enter topic number that's you want to learn previous or next2:- ")
//         if user_input_3=="p":
//             serial_no_1=0
//             for i in data_1["data"]:
//                 print("      ",serial_no_1+1,".",i["name"])
//                 if len(i["childExercises"])>0:
//                     s= 0
//                     for j in i['childExercises']:
//                         s = s+ 1
//                         print( "               ",s,j['name'])
//                 else:
//                     print("                1",i["slug"])
//                 serial_no_1+=1
// topic_no = int(input("Enter topic number that's you want to learn:- "))
// m = 0
// while m < len(data_1["data"][topic_no-1]["chtent"ildExercises"]):
//     print("     ", m+1 ,data_1["data"][topic_no-1]["childExercises"][m]["name"])
//     slug = (data_1["data"][topic_no-1]["childExercises"][m]["slug"])

//     child_exercises_url = ("http://saral.navgurukul.org/api/courses/" +  str(parent_id) +"/exercise/getBySlug?slug=" + slug )
//     Data_3 = requests.get(child_exercises_url)

//     convert_data = Data_3.json()
    // with open("Topic.json","w") as convert_1:
        // json.dump(convert_data,convert_1,indent=4)
//     my_list.append(convert_data["content"])
//     m = m + 1

// questions_no = int(input("choose the specific questions no :- "))
// question=questions_no-1
// print(my_list[question])
// while questions_no > 0 :
//     next_question = input("do you next question or previous question n/p3 :- ")
//     if questions_no == len(my_list):
//         print("next page")
//     if next_question == "p" :
//         if questions_no == 1:
//             print("no more questions")
//             break
//         elif questions_no > 0:
//             questions_no = questions_no - 2
//             print(my_list[questions_no])
//     elif next_question == "n":
//         if questions_no < len(my_list):
//             index = questions_no + 1
//             print(my_list[index-1])
//             question = question + 1
//             questions_no = questions_no + 1 
            // if question == (len(my_list)-1) :
            //     print("next page")

