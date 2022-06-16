# Setting up Nodemailer to add emailing function on an App

This workshop will show you how to setting up Nodemailer on the Wild Code School template. You will be able to send an email from an user form.

## Setup the project

First, clone this project and run `npm run setup`. The front part is already setup, on the App.js component, you can find the form. On the handleSubmit function, look at the axios.post method, and put your own backend localhost port.

Move to the backend folder and install the nodemailer dependancy:
`npm install nodemailer`

## Creating an account on Sendinblue

Sendinblue is a french emailing plateform. By using it, you will be able to use their SMTP parameters to send email from your app.

Create an account on this website : https://app.sendinblue.com/account/profile/

Add all informations needed. You will receive a confirmation email to finish the account creation. (Sendingblue recommends you to use a professionnal email, but you can use a classical email like a gmail one).

On your account, navigate to SMTP & API, and on the SMTP tab.

You will find these informations : 
- SMTP server
- Port
- id
- SMTP key (you maybe need to generate it)

## Setting up the .env file

On the backend folder, create a .env file if does not exist and add these informations :

```
APP_PORT=5005
FRONTEND_URL=http://localhost:3000


SMTP_SENDIN=(the SMTP server from sendinblue)
SMTP_PORT_SENDIN=(the prot from sendinblue)
SMTP_SENDIN_USER=(the id from sendinblue)
SMTP_SENDIN_PASSWORD=(the key from sendinblue)
```

## Add the sendMail controller

Move to controllers folder and into the ItemController.js file.

Import nodemailer and dotenv : 
```
const nodemailer = require("nodemailer");
require("dotenv").config();
```

Add a sendEmail function. This function take in parameter req and res. We get some informations from the req.body.

```
static sendMail = (req, res) => {
const {name, surname, phone, email, message} = req.body;
}
```

Next, we need to create a transporter in which we will setting up our SMTP server :

```
static sendMail = (req, res) => {
const {name, surname, phone, email, message} = req.body;

const transporter = nodemailer.createTransport({
      host: process.env.SMTP_SENDIN,
      port: process.env.SMTP_PORT_SENDIN,
      secure: false,
      auth: {
        user: process.env.SMTP_SENDIN_USER,
        pass: process.env.SMTP_SENDIN_PASSWORD,
      },
    });

}
```
NB : the secure key must be setting up to false for 587 PORT, and true for 465 PORT. By default, sendinBlue give you a 587 PORT.

Now, we can set up the body of our mail :

```
static sendMail = (req, res) => {
const {name, surname, phone, email, message} = req.body;

const transporter = nodemailer.createTransport({
      host: process.env.SMTP_SENDIN,
      port: process.env.SMTP_PORT_SENDIN,
      secure: false,
      auth: {
        user: process.env.SMTP_SENDIN_USER,
        pass: process.env.SMTP_SENDIN_PASSWORD,
      },
    });
    
const mailOptions = {
      from: "youremail@email.com",
      to: "youremail@email.com", //this is the address to which the email will be sent
      subject: "New message from contact form",
      text: `${message} \n\n Phone: ${phone} \n\n Name: ${name} \n\n Surname: ${surname} \n\n Email: ${email}`,
      html: `<p>${message}</p> <p>Phone: ${phone}</p> <p>Name: ${name}</p> <p>Surname: ${surname}</p> <p>Email: ${email}</p>`,
    };
}
```

Finally, we return the transporter with the sendMail method :

```
static sendMail = (req, res) => {
const {name, surname, phone, email, message} = req.body;

const transporter = nodemailer.createTransport({
      host: process.env.SMTP_SENDIN,
      port: process.env.SMTP_PORT_SENDIN,
      secure: false,
      auth: {
        user: process.env.SMTP_SENDIN_USER,
        pass: process.env.SMTP_SENDIN_PASSWORD,
      },
    });
    
const mailOptions = {
      from: email,
      to: "youremail@email.com", //this is the address to which the email will be sent
      subject: "New message from contact form",
      text: `${message} \n\n Phone: ${phone} \n\n Name: ${name} \n\n Surname: ${surname} \n\n Email: ${email}`,
      html: `<p>${message}</p> <p>Phone: ${phone}</p> <p>Name: ${name}</p> <p>Surname: ${surname}</p> <p>Email: ${email}</p>`,
    };
    
return transporter
     .sendMail(mailOptions)
     .then((info) => {
       console.warn(info);
       res.status(200).send("Message sent");
     })
     .catch((err) => {
       console.warn(err);
       res.status(500).send("Something went wrong");
     });
}
```

## Add a route

In the router.js file, we need to add a route for sending our email :

```
router.post("/sendEmail", ItemController.sendMail);
```

You can test your route on Postman, in the body, Raw tab, JSON format, add an object :

```
{
    "name" : "Doe",
    "surname" : "John",
    "phone" : "+33 6 14 55 23 58",
    "email" : "johndoe@email.com",
    "message" : "Hello ! i need some extra informations about your amazing website !"
}
```

💪 Well done, you should receive a message on the email address that you put into the "to" key in the mailOptions variable. If not, look into your spams !

## Front

Go back to the front folder, in the app.js file. Make sure the port of the axios.post method is the same as your backend port.

Launch `npm run dev` on the root folder of the project.

Now, if you go to http://localhost:3000 on your web browser, you can see the form. You can test by writting a new message a click the send button.

you should receive a message on the email address that you put into the "to" key in the mailOptions variable. If not, look into your spams !



