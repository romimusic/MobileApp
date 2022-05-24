$(document).on("pagecreate", "#home", function(){    

    //card flipped
        $('.card').click(function(){
            $(this).toggleClass('flipped');
        });

         //form validation
    $("#register").on('click', function (event) {
        //regex to validate email
        const emailValid =  /^[a-zA-Z0-9_\.\-]+@[a-zA-Z0-9\-]+\.[a-zA-Z0-9-\-\.]+$/;

        //data from input
        const name = $("#name").val();
        const lastname = $("#lastname").val();
        const state = $("#select_state").val();
        const email = $("#email").val();
        const age = $("#age").val();
        let emailOk = true;
        let users = [];
        let user = {};

        //validate name is not empty
        if (name == "") {
            $("#mssg").fadeIn();
          } else {
            $("#mssg").fadeOut();
          }
        //validate lastname is not empty
        if (lastname == "") {
        $("#mssg_lastname").fadeIn();
        } else {
        $("#mssg_lastname").fadeOut();
        } 
        //validate state is not empty
        if ( state == "" ) {
        $("#mssg_state").fadeIn();
        } else {
        $("#mssg_state").fadeOut();
        } 
        //validate email is not empty and is a email address
        if (email == "" || !emailValid.test(email)) {
        $("#mssg_email" ).fadeIn();
            emailOk = false;
        } else {
        $("#mssg_email").fadeOut();
        } 
        //validate age is over 18 and under 120
        if (age == "" || age < 18 || age > 120) {
        $("#mssg_age" ).fadeIn();
        } else {
        $("#mssg_age").fadeOut();
        }

        if (name != '' && lastname != '' && state != '' && emailOk != false && age >= 18 && age < 120) {
            user = {
                   name : name,
                   lastname : lastname,
                   state : state,
                   email : email,
                   age : age,
                 };
            let store = JSON.parse(localStorage.getItem('users'));
            store = (typeof store === "undefined" || store === null) ? [] : store;
            store.push(user);

            localStorage.setItem('users', JSON.stringify(store));
            clearForm();
            alert('Data Stored');
           }
    });   

    //clear localStorage data 
    function clearData () {
        localStorage.clear();
    }

    $('#clear').on('click', function () {
        clearForm();
    });

    //clear form but not localStorage
    function clearForm () {
        $('#form_census')[0].reset();
    }

    $("#clear").on('click', function () {
        clearFormTest();
    } );

    //clean localStorage from menu
    $("#localClear").click( function () {
        clearData();
    });

    $("#localClearAbout").click( function () {
        clearData();
    });

    $("#localClearFormData").click( function () {
        clearData();
    });

    $("#localClearForm").click( function () {
        clearData();
    });

    $("#localClearStudent").click( function () {
        clearData();
    });

    $("#localClearApiData").click( function () {
        clearData();
    });
    

    

    //create list with all data
function createLi () {

    let store = JSON.parse(localStorage.getItem('users'));
    store = (typeof store === "undefined" || store === null) ? [] : store;

    if (store.length > 0) {
        
        store.forEach((user) => {
            let html = `
                    <tr>
                        <td>${user.name} </td>
                        <td>${user.lastname} </td>
                        <td>${user.state} </td>
                        <td>${user.email} </td>
                        <td>${user.age} </td>
                        
                    </tr>
            `;
            $("#censusData").append(html);
        });

    }
    
}

    $(document).ready(function(e) {
        createLi();
    });


    $('document').ready(function (e) {


        //set random colors
        $('.refresh').click(function(){
            $('.color').each(function(){
                var rColor = '#' + Math.random().toString(16).substr(2,6);
                $(this).css('background-color',rColor);
                $(this).children(".color-hex").text(rColor);
            });
            }).trigger('click');

            //copy to clipboard
            $('.color').click(function(){
            var input = $("<input>");
            var color = $(this).children(".color-hex").text();    
            $('body').append(input);
            input.val(color).select();
            document.execCommand('copy');
            input.remove();
            $('.copied').fadeIn().delay(2000).fadeOut();
            });

    });

    const baseURL = "https://randomuser.me/api/"; 

    $("#fetch").on("click", function(event){
        getData();
        
    });

    const getData = async () => {
        const response = await fetch(baseURL);

        const data = await response.json();

        let nameApi = data.results[0].name.title + " " + data.results[0].name.first + " " + data.results[0].name.last;
        let imageApi = data.results[0].picture.medium;
        
        let htmlApi = `
            <section class="apidata">
                <h1 class="apidata__title">
                    ${nameApi}
                </h1>

                <figure>
                    <img src="${imageApi}" alt="${nameApi}">
                </figure>

                <div class="apidata__details">
                    <p>Country: ${data.results[0].location.country}</p>
                    <p>Phone: ${data.results[0].phone}</p>
                    <p>Email: ${data.results[0].email}</p>
                </div>
            </section>  
        `;

        $("#apiData").append(htmlApi);

    } 


}); //end pagecreate 