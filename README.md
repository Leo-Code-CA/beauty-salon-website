
# Full Stack Beauty Salon Website
This is a full stack beauty salon website. I started this project in October 2023. It is without any doubt the biggest and most complex code project I've ever started so far.
## Table of contents
- [Overview](#overview)
- [The project](#the-project)
- [The concept](#the-concept)
- [The structure](#the-structure)
- [The phases](#the-phases)
- [Screenshot](#screenshot)
- [Links](#links)
- [My process](#my-process)
- [Built with](#built-with)
- [What I learned](#what-i-learned)
- [Continued development](#continued-development)
- [Useful resources](#useful-resources)
- [Author](#author)
## Overview
#### The concept
This project means a lot to me as it's not only a project I've been doing to improve my coding skills but also a project that is destined to, one day, be the website of an actual beauty salon named "Institut For You", owned by my mother-in-law.

For now, she has a basic WordPress powered website with a theme installed by my partner a few years ago. It's functional but it starts to be outdated and I definitely would love to help her out by coding her a brand new, improved, totally unique and customized, website.

Furthermore, my mother-in-law is not comfortable with technology in general and struggles when she wants to update, add or delete some information on her website, even with the WordPress interface. To solve this problem I figured out that letting her modify only the services she offers (prices, description) in an easy, step-by-step, guided way would probably fit her the best.

What I want to create is probably a kind of CMS, simplified and dedicated to a single user. My goal is to give her access to an admin page where she can login and make those CRUD operations in a "computer novice" way, without spending hours on it.

As soon as I learnt HTML, CSS and JavaScript basics, I was determined to start working on that project. It's a surprise so my mother-in-law doesn't know anything about it, even 6 months after I began. I definitely hope I'll be able to finish it, sooner or later, to finally reveal it to her and see what she thinks of it!

Most of the content on the website is in French as my mother's in-laws salon is located in France and is targeting mostly by French customers. However, all the code is in English so it shouldn't be a big problem for any developer who don't speak French.

#### The structure
The content of the new website will be more or less the same as the one she currently has so I inspired myself of the way it was structured.

Basically it's a pretty furnished home page, three pages that dived the services offered by the salon in categories: massages, waxing and treatments, an about page, a gift page and a contact page. There is also a navbar and a footer.

This is basically what it looks like: 
 - Home page
 - Massages
	 - Face
	 - Body
 - Waxing
	 - Face
	 - Body
 - Treatments
	 - Face
	 - Body
 - About
 - Contact
 - Gift
#### The phases
To be honest, when I first started, I didn't plan to create some phases in the project but the more I've been working on it, the more I've found it was necessary to keep track of my progress (what has been done, what is left to do)> It's also helpful to guide me throughout the process, especially as the project grows bigger. 

##### Phase 1: Planning / Mocking - Get a first idea of what the website is gonna be
Brainstorm, create a plan, try to imagine how I'd like the website to function and to look like. Check what content is required on each page, in what order. Collect some free assets (images, icons, illustrations, videos).

I actually don't really know when this phase started and finished because I literally mixed it up with phase 2. It was definitely not the best thing to do but... I didn't know that and I had no particular process to follow at that time! That's how we learn, right?

##### Phase 2: Front-end implementation - Create the main functionalities and some design
HTML, CSS, JavaScript. Creating the structure with HTML and adding some classes to the elements as I decided to use bootstrap for that project. Adding some custom CSS to improve the design and the responsiveness, I decided to use Sass for that purpose. Creating interactivity and animations with Vanilla JavaScript (I realize today that I've definitely not chosen the easiest option!).

To be more precise, those are the tasks realized in phase 2:

Structure, design, responsiveness, animation and interactivity of the entire home page, about page, contact page, gift page and massage page. The waxing and treatments pages are not implemented in phase two as they are very similar to the massage one functionality and design wise, the only difference is the content.

I also want to emphasize that the design isn't a priority in phase two. The website has to look decent but not absolutely nailed. The time is not infinite and I have to focus on the biggest part of the job in order to keep moving forward. Later on, the design will be finalized.

##### Phase 3: Front-end cleanup - Get rid of the accumulated unused code snippets, comments and debug 

At this point, most of the front-end content is done and some dozens of lines of code have been accumulated over time. Even if I tried to keep it as tidy and organized as possible, there are definitely some parts of my code that can be cleaned and improved. Phase 3 is the moment dedicated to that task, reviewing everything I've written so far and trying to fix what has to be fixed before moving on to the next phase.

---
The project is currently here. The phase 3 is complete and the phase 4 is to come.
*Last update on May 2024*

---

##### Phase 4: Back-end implementation - Get the server side working and connect it to the front-end

It's time to dive into the deep backend and take care mostly of the routing, server side form validation and database set up. It's also in that phase that I'm connecting the backend and the front-end together by updating some of my front-end content that was using 'dummy data' so far to actually fetch the data from the database.

##### Phase 5: Content Management - Allow the admin to modify the website easily

In that phase, I'm taking care of the admin side of the website. On the front-end, I create the user friendly interface used by the website owner to create, delete or update some content. On the backend, I make sure to set-up the different endpoints and necessary validations to update the database content depending on the user input. I also implement the user authentication to provide a secure access to the admin interface.

##### Phase 6: Deployment - Global cleanup, design details, testing and give life to the website!

During this last phase of the project, I review one more time the code of the whole website, front-end and back-end. I take the time to improve the design and to create the two missing service pages: waxing and treatments. Then, I test the application and finally make it available to the public.

### Screenshot
![]()
### Links
- Live Site URL: [Live site URL]()
## My process
### Built with
- Semantic html
- Custom CSS (sass)
- Bootstrap 5
- Vanilla JavaScript
- Many great web apis (intersection observer, url, animation)
### What I learned

I learned so many things that it's hard to recall them all but I'll do my best. I love so much working on that website because I can improve lots of different skills by doing so: organization, time management, problem solving, debugging, using new JavaScript functionalities, for example. Learning by doing is my favorite way to acquire knowledge. Coding skills are one of those that can be learned that way so it's a great fit for me!

As this project is not finalized at the time I'm writing that readme, the list of things I've learned so far will keep growing over time.

Let's list what I've learnt so far:
*Last update on May 2024*
- Scroll bound animations with intersection observer and scroll API
- Advanced responsiveness
- Multipage website
- Video editing and integration
- Accordion components
- Tables elements
- Carousels components
- Search bar with suggestions dropdown
- Fetch Google maps JavaScript place API (reviews and maps)
- Routing paired with scroll to element functionality
- URL API (using parameters to pass data)
- Web animation API
- Dynamic update of root variables
- Dynamic forms (more content is displayed depending on the user input)
- Front-end form validation
- Dynamic content displayed on the page depending on what info were received through the form
- Responsive photo gallery with filters
- Algorithm to suggest services depending on the amount the client wants to spend
- Advanced algorithms / Time and Space complexity
### My mistakes / What would I change if I could to start again

1. Choosing vanilla JavaScript

It's a bit contradictory but in one hand, I'm glad I did so because it has allowed me to learn so much more about it and I think it's really important because it is what's under the hood of all those powerful frameworks.

In the other hand, I regret because it made everything so much harder and longer, especially for a big project like that one. The more my React skills improve, the more I realize how convenient it'd have been to use it to build that website: state management, routing, reusable components, etc.

2. Choosing Bootstrap

I started learning bootstrap with FCC's front-end development libraries certification and I thought this website would be a good opportunity to put my skills into practice. I still agree with that statement today, however, with practice, I discovered that I didn't appreciate that much bootstrap.

In a situation where you just want to do some quick styling, without much efforts, it might be a good option but for that project, I definitely feel like it has been slowing me down and causing me trouble more than the opposite.

Using the default classes bootstrap provides is not an issue but as soon as I want to modify, customize or debug something, I quickly feel like I have to "fight the framework". That's why, if I could start again, I'd probably not use it for that particular website.

3. My general organization and my time management

 I think I spent way too much time and efforts on things that weren't necessarily worth it or that weren't accessible to me at the time I tried.
 
For example, when I worked on the integration of the Google maps API for the first time, I had no back-end knowledge at all and I was feeling overwhelmed with what I was finding online. I literally spent days on it without managing to figure something out. I ended up postponing that task. Better learn the back-end basics first!

I also spent days and days on animations and I definitely regret as well. The mobile only scroll bound animation is not smooth at all and even quite buggy, even after spending lots of time on it. A similar scenario happened to me with the slide in animation. I absolutely wanted to make it work a certain way and even if I tried my best, the result, especially on mobile devices is not great at all. I think I should have done something simpler but cleaner, especially considering the fact that I choose not to use any npm package except Bootstrap. 

5. Responsiveness

I definitely underestimated the difficulty of making a whole website responsive so I kind of neglected it at first. Even if I knew that bootstrap is a mobile first approach framework, I didn't really pay attention to it and built most of the home page desktop version first.

I regretted it so, so much when I started to take care of the tablet and mobile versions of the website! It was so much more difficult and long that it would have been if I had done things properly, in the right order, from the beginning. Thankfully it was a good lesson and I definitely changed my approach for the rest of the website!

### Continued development
For now, the project is in standby in phase 3. I definitely don't plan to give up at all but I have other priorities at the moment: getting ready to start applying in the development industry.

It's been almost a year that I've been learning how to code by myself in parallel to my full time job. I need to move forward in my life and that's my way to do so. I find that the project at this phase is still furnished enough to have a place in my portfolio.

I plan to focus on my job hunt these next few months. Meanwhile, I'll keep learning and moving progressively forward on this website. If I manage to get a job, I don't plan to stop developing during my free time as it's definitely something I appreciate and I'm still determined to gift this website to my mother-in-law one day or another.

### Useful resources

- []() -

## Author

- GitHub - [@Leo-Code-CA](https://github.com/Leo-Code-CA)
- FreeCodeCamp - [@Leo-code](https://www.freecodecamp.org/Leo-code)