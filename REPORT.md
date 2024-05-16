# Deployment and Final Reports (Group25)

## Introduction

Group 25 worked on a single-page task manager app using Lit Web Components, a fascinating project. This project tested our web development skills and challenge us to design a smooth user experience. Our task manager app empowers users by simplifying task viewing and manipulation. Its design centers on 'widgets' that enhance the task display. These widgets are crucial to user experience and task management insights. According to project guidelines, we shall only use Lit Web Components to construct our app. This technology lets us construct our app from scratch without React or Vue.js. By harnessing the power of Lit, we can ensure that every line of code in our submission is crafted by our team, reflecting our collective expertise and creativity. To streamline our development process, each team member will be responsible for specific components within the project. This division of tasks ensures that every aspect of our application receives dedicated attention and expertise. Below is an overview of the tasks assigned to each team member:

1. Widget-1 (Task Summary) - Ruby
2. Widget-2 (Calendar) - Rahman
3. Widget-3 (Task Timer) - Amar
4. Widget-4 (Weekly Summary) - James

In addition to widget implementation, Rahman will undertake the responsibility of enhancing the core task display component, including implementing task creation, deletion, and improving the task edit form layout. Furthermore, Rahman will design and implement a pop-up task detail view to enhance user interaction. For team communication we used whats App group chat. As a team, we worked to improve the layout and design of the app as a whole, making sure that the user experience works well and looks good.

## Deployment Process (Cloudflare Pages Deployment)

[Task Manager](https://comp2110-group25-59q.pages.dev/)

#### **Step 1: Create a GitHub Repository**
- Navigate to [GitHub's new repository page](https://github.com/new).
- Under the 'MQCOMP2110-24' organization, create a repository named `web-deployment-group25`.
- Provide a brief description.
- Set the repository visibility to **public**.
- Initialize with a **README** file.

#### **Step 2: Copy the Source Code**
- Transfer the source code from `web-development-project-group25` to `web-deployment-group25`.

#### **Step 3: Push to GitHub**
Execute the following commands in our terminal:
```bash
git init
git remote add origin https://github.com/70mrahman/web-deployment-group25
git add .
git commit -m "Initial commit"
git branch -M main
git push -u origin main
```

#### **Step 4: Cloudflare Account Setup**
- Create and log in to your Cloudflare account.
- Deploy the site using the `wrangler` CLI in VS Code.

#### **Step 5: Install Wrangler**
Run the command:
```bash
npm install wrangler
```

#### **Step 6: Authenticate with Cloudflare**
Authenticate via the terminal:
```bash
npx wrangler login
```
*This will prompt a browser window for authentication.*

#### **Step 7: Create the Project**
Create our project with:
```bash
npx wrangler pages project create comp2110-group25
```

#### **Step 8: Publish the Project**
Publish using:
```bash
npx wrangler pages publish .
```

#### **Step 9: Re-deploy the Project**
Re-deploy Publish using:
```bash
npx wrangler pages publish .
```

#### **Screen shot of the deployment process**

![Deployment image-1](https://i.ibb.co/nm54NRt/img-1.png)
![Deployment image-2](https://i.ibb.co/d2MtVc9/img-2.png)


## Achievments

Group25 has created a collection of widgets that underpin our task management software to simplify the experience. Our Calendar widget keeps users informed of their future chores and blends into the design for a unified user experience. The Task Summary widget shows task distribution, letting users rapidly assess their workload. Our Task Timer and Weekly Summary widgets make task management more interactive and foresightful. The Task Timer counts down time-sensitive tasks, while the Weekly Summary helps users plan for the week. Delete Task is not only a feature; it demonstrates our commitment to flexibility and control and user experience. We've also refined the dialog in the edit task component, ensuring that even the most detailed tasks are displayed in full, without overwhelming the user interface. The model class inheritance shows our commitment to clean, manageable code, which builds the groundwork for future expansions and scalability. However, the application's GUI design may be our greatest achievement. Our holistic approach ensures that each component works properly and adds to a unified, aesthetically beautiful design language that our users like.

Overall, Group25 met project criteria and added features and smart design to improve user experience. Our widgets represent our idea for an intuitive, efficient, and enjoyable task organizer.

## Challenges

The challenges we faced during the project were multifaceted, encompassing both technical and organizational hurdles. For students at the bachelor's level, particularly those without industrial experience, trying to figure out the details  of web development presented a steep learning curve. The task of integrating custom components within the constraints of the existing API required a delicate understanding
of the framework, which at first seemed frightening. Moreover, the concept of client-server communication was a complex subject for those unacquainted with backend development. Despite these obstacles, the comprehensive tutorials provided a beacon of clarity, illuminating the path to a deeper comprehension of the full stack involved.

On the organizational front, remote collaboration introduced its own set of challenges. Effective communication is the lifeblood of any project, yet achieving this remotely demanded a high degree of coordination and commitment. For successfully completion any project it requires project Manager and have to use agile methodology which actually ensure the completion. We used WhatsApp for day-to-day communication. However, other subjects pressure sometimes took our attention away from the project. Nevertheless, the technical documentation and lectures short videos served as a reliable guidepost, enabling us to navigate through the project's complexities. Each team member brought their unique perspective and skill set to the table, contributing earnestly to the collective effort. In retrospect, the project was not only a test of our technical strength but also a valuable lesson in teamwork and perseverance.

## Rewards

The journey through this unit has been immensely rewarding, both intellectually and practically. The well-structured tutorials and hands-on content provided a solid foundation in web development, particularly in JavaScript, which is the lifeblood of modern web applications. Despite the steep learning curve, the consistent practice and application of code not only bolstered us understanding but also enhanced our proficiency. The use of Lit components was particularly enlightening. It offered a glimpse into the future of web development, where custom components are likely to play a pivotal role. Mastering this aspect of the project was not just an academic exercise; it was a skill-building endeavor that has prepared us for real-world challenges. The creation and manipulation of custom components were not just part of the curriculum; they were a bridge to the industry standards that await.


## Reflections

#### **Mostafizur Rahman (SID: 46185895)**

**Widget Implementation and Design Enhancements:**

- [x] **Calendar Widget:** I chose the Calendar widget for its pivotal role in task management. It now fully functions to display the current month, highlight the current day, and mark days with due tasks. Interactive controls added which will allow users to navigate between months.

- [x] **Task Addition and Deletion:** I implemented the Add Task and Delete Task features using the API, complete with user-friendly GUI designs, ensuring a seamless user experience.

- [x] **Edit Task Dialog Enhancement:** To accommodate lengthy task descriptions, I introduced a dialog in the edit task component, enhancing content visibility without cluttering the interface.

- [x] **GUI Overhaul:** I undertook a comprehensive redesign of the application's GUI, focusing on:

    - [x] **Login Component:** Changed the login GUI, incorporating a group image upon successful login.
    
    - [x] **Images in the background:** Added a background image for non-logged-in users mode to enrich the visual appeal.
    
    - [x] **Task Management Interface:** Improved the design of the Task Manager, Task Board, and Task Card components for a more intuitive user experience. The css of header and footer also changed.

**CSS and AI Integration:**

- Utilized generative AI to produce syntactically correct CSS code, accelerating the development process and ensuring design consistency.

**Challenges Encountered:**

- **Calendar Widget Data Integration:** Integrating task information into the Calendar widget was challenging. It required a thorough understanding of the model class's event system and the implementation of a custom event listener for task updates within the widget.

- **Model Class Inheritance:** Attempting to implement inheritance within the model class presented a significant challenge. Singleton errors persisted, and due to time constraints, this issue remained unresolved.

This reflection encapsulates my personal journey through the project, highlighting the tasks I completed and the challenges I faced. The experience was both demanding and enlightening, pushing me to expand my technical skills and adapt to complex development scenarios.


#### **Amr Abdelghaffar (SID: )**

TODO:


#### **Jiaming (James) Li (SID: )**

TODO:

#### **Ruby Cant (SID: )**

TODO:

## Conclusion

The project was a complete learning experience that combined technical skill development with real-world application. The team's dedication to developing widgets and improving the GUI design has met project criteria and brought value to the application. The challenges, from integrating task information into widgets, have helped the team grasp web development and collaborative problem-solving. The project shows the team's ability to overcome remote communication and academic challenges to create a practical and attractive task management tool. This project improved the team's technical skills and gave them a sense of accomplishment and industry readiness. As part of a web technology group assignment, the project was enjoyable and taught each participant web development abilities.


## Appendix

### Group Communication (Whats App)

![Communication-1](https://i.ibb.co/D9SBYQG/sc-1.png)
![Communication-2](https://i.ibb.co/S3P9gSs/sc-2.png)
![Communication-3](https://i.ibb.co/ky2MJVP/sc-3.png)
![Communication-4](https://i.ibb.co/sw3v3BW/sc-4.png)
![Communication-5](https://i.ibb.co/yhVxQVB/sc-5.png)
![Communication-6](https://i.ibb.co/d2GnKwz/sc-6.png)
![Communication-7](https://i.ibb.co/m6PbwBD/sc-7.png)
![Communication-8](https://i.ibb.co/QNSgss4/sc-8.png)
![Communication-9](https://i.ibb.co/jyC4Dtf/sc-9.png)
![Communication-10](https://i.ibb.co/n6gwxw5/sc-10.png)
![Communication-11](https://i.ibb.co/r3R225X/sc-11.png)
![Communication-12](https://i.ibb.co/XzhBcj2/sc-12.png)
![Communication-13](https://i.ibb.co/Mh7C8WK/sc-13.png)
![Communication-14](https://i.ibb.co/yyhhRfh/sc-14.png)
![Communication-15](https://i.ibb.co/GTTCVSz/sc-15.png)
![Communication-16](https://i.ibb.co/rcNkrXr/sc-16.png)


