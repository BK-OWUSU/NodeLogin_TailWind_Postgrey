//Nav Bar change color on Scroll
window.addEventListener('scroll', ()=>{
    document.querySelector('.nav_bar').classList.toggle('scroll-bar', window.scrollY > 100);
    document.querySelector('.btn_signIn').classList.toggle('btn_signIn-scroll', window.scrollY > 100);
    document.querySelector('.btn_contact').classList.toggle('btn_signIn-scroll', window.scrollY > 100);
});
  

const sign_up = document.getElementById('sign_up');
const signIn_cont = document.querySelector('.signIn_cont');
const signUp_wrapper = document.querySelector('.signUp_wrapper');


sign_up.addEventListener('click', ()=>{
    signIn_cont.classList.add('show');
    signUp_wrapper.classList.add('show');
});

signUp_wrapper.addEventListener('click',(e)=>{
    if (e.target.classList.contains('show')) {
        signIn_cont.classList.remove('show');
    }
});

// const signUp_form = document.getElementById('signUp_form');
// const firstname = document.getElementById('firstname');
// const lastname = document.getElementById('lastname');
// const email = document.getElementById('email');
// const password = document.getElementById('password');
// const register_btn = document.getElementById('register_btn');

// register_btn.addEventListener('click', async(e)=> {
//     e.preventDefault();
//     try {
//         if(firstname.value ===""|| lastname.value ==="" || email.value ==="" || password.value ==="") {
//             Swal.fire({
//                 title: 'Error',
//                 text: 'Please fill all fields',
//                 icon: 'error',
//             });
//             return;
//         }
//         const user = {
//             firstname: firstname.value,
//             lastname: lastname.value,
//             email: email.value,
//             password: password.value 
//         }
//         const response = await fetch(`http://localhost:3000/auth/register`,{
//             method: 'POST',
//             headers: {
//                 'Accept': 'application/json',
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify(user)
//         });
//         const res = await response.json();
//         console.log(res)
//     } catch (error) {
//         console.error("Error registering user: ", error);
//         throw error;
//     }
// });