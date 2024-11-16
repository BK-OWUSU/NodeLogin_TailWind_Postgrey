const logOut_btn = document.getElementById('logOut_btn');
const logoutForm = document.getElementById('logoutForm');
logOut_btn.addEventListener('click',async()=> {
   swal.fire({
    title: 'Are you sure you want to log out?',
    text: 'You will be logged out of your account.',
    icon: 'warning',
    showCancelButton: true,
   }).then(async(confirm)=> {
     if (confirm.value) {
        try {
            logoutForm.submit();
        } catch (error) {
            throw error;
        }
     }
   });
});
