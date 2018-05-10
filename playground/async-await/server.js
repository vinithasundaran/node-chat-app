
const users = [{
    id: 1,
    name: "Vinitha",
    schoolId: 100
}, {
    id: 2,
    name: "Vinitha",
    schoolId: 101
}]


const grades = [{
    id: 1,
    grade: 100,
    schoolId: 100
}, {
    id: 2,
    grade: 98,
    schoolId: 102
}]

const getGrades = (schoolId) =>{
    return new Promise((resolve, reject) => {

        const grade = grades.find((grade) => grade.schoolId == schoolId);

        if (grade) {
            resolve(grade);
        } else {
            reject('School not found');
        }

    });
}

var getUser = (id) => {
    return new Promise((resolve, reject) => {

        const user = users.find((user) => user.id == id);

        if (user) {
            resolve(user);
        } else {
            reject('User not found');
        }

    });
}


const getStatus = (userId) =>{
    return getUser(userId)
    .then((user) =>{
        return getGrades(user.schoolId)
    }).then((  grades )=>{
        console.log('hi');
        let average;
      //  average = grades.map(()=> grade.gr)
        console.log(grades.length);
    })
    
}

const getstatusNew = async (id) =>{
    const user = await getUser(id);
    console.log(user);
}

getstatusNew(1).then((user)=>{
    console.log(user);
})