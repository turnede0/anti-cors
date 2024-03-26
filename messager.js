
function sendMessage(){
Swal.fire({
    title: "Send Message",
    html: `
      ID <input id="input_ids" class="swal2-input"><br>
      Title <input id="input_title" class="swal2-input"><br>
      Time <input id="input_time" class="swal2-input"><br>
      Venue <input id="input_venue" class="swal2-input"><br>
      Content <input id="input_content" class="swal2-input"><br>
      
    `,
    focusConfirm: false,
    preConfirm: () => { 
        let formData = JSON.stringify({node:document.getElementById("input_ids").value,
                              title:document.getElementById("input_title").value,
                              time:document.getElementById("input_time").value,
                              venue:document.getElementById("input_venue").value,
                              content:document.getElementById("input_content").value,
                              speical:0});
        console.log(formData+'\n');
        WriteCMD(formData+'\n');
        Swal.fire("Message Sent");
        // Swal.fire("Message Sent"+ formData);
      }
    });
    
      

}