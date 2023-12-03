# KineXus

KineXus is a composable interactive experience framework.
Developed for creating interactive experiences in any environment.


## Design Concepts

- Modularity
- Composable
- Technologically Agnostic
- Scalability
- Flexibility
- Reliability
- Security
- Performance
- Extendability
- Upgradable
- Managable


## Technology Agnostic

- `Open-mindedness`
  - Being open to using different technologies, platforms, or tools, depending on which is best suited for the task.

- `Flexibility`
  - The ability to adapt to different technologies as needs and situations change.

- `Focus on Solutions, Not Tools`: 
  - Emphasizing the end goal or solution rather than getting tied to a specific tool or technology to achieve it.

- `Avoiding Bias`
  - Not being biased towards a particular brand, software, or technology due to familiarity or popularity.



## Key Overall Concepts

- Experience
- Input 
- Simulation
- Output
- Data


## Ecosystem Concepts

- API
  - External APIs
  - Internal APIs


- Backend
  
  - Data
    - Capture
    - Manipulation

  - Inter System Communication


- Experience

  - Interaction
    - Input
    - Control

  - Simulation
    - Game Engine
  
  - Sensory Experience
    - Output
      - Touch
      - Taste
      - Smell
      - Auditory
      - Vision





## Example Setup

### Brief


Ballon Pop Game Projected On Wall of Space
Player uses their finger points to pop ballons
User gets their score on leaderboard


### Experience

User Scans QR code to create a player Avatar on their phone
Once ready the user presses "Let's Play" button on their phone
This puts them in the queue for the game
The User can see on their phone where they are in the wait list
Once their turn is coming soon (1-2 more games) it will then notify them on their phone and ask if they are ready to play?
If yes then it keeps them in their position in the queue otherwise they will move down the queue afew steps
Once its the users turn it will show their Avatar on the screen and the game will start as soon as they are in position and hit go!
The Game scene has baloons float in to the viewport of the screen
The play will use the point of their fingers and pop the baloons
Once the game is over the score is added to the leaderboard
It will show their place in the leaderboard on the main screen
It will then scroll up to the top ten on the main screen.
They will also beable to view their leaderboard on their phone


### How
- Hand Pose is detected using TensorFlow
- Webcam captures the player hand pose
- Experience engine will manage the user experience and events
- Viewport will use HTML canvas
- Database holds all user data & scores
- 


### Systems Overview
- Camera Video Capture
- Tensorflow Processing of Video Stream
- Websocket Server for communication
- Game Engine (TypeScript)
- Frontend (incl Game View) (ReactJS)
- 
- Database


### Input Systems:
- Webcam



 


### Input Systems:
- Webcam
- Embedded device or Windows PC
- TensorFlow - Hand Pose Detection

### Data Systems:
- Robotics
- HTML canvas
- Notifications
- Database

### Output Systems:
- ReactJS Canvas Ballon Pop Game
- Windows PC
- Electron







- Hand Pose Detection
- Keyboard
- Custom Hardware Buttons




## Technology
Built with Node.js

- ReactJS
- NextJS
- NextUI
- ElectroCore
- Websockets
- TypeScript


## Websockets

Will be used to manage connections between hardware and input and output systems
 



















# Designing KineXus

## Question:

I am designing a composable interactive experience system.
I want it to be able to be used in any kind of environment and have a good user experience.

The input type could be anything and would change depending on the situation and usecase.

For example it could use hand pose detection or keyboard input or a custom hardware button or even detecting the distance of the colour red.

The interactions could control a game or experience an HTML canvas or it could control robotics or anything

It could even send messages or notifications to people in a certain area.

The system will also have a user management system that would be flexible so that it could be connected to any data base depending on the need or if technology changes in the future.

What do you think the best way to build this idea?


## ChatGPT Response:


Designing a composable interactive experience system as you've described is an ambitious and exciting project. To effectively build such a system, a modular and scalable approach is key. Here are some steps and considerations to guide you:

### 1. **Define Core Objectives and Use Cases**
   - Clearly outline the primary objectives and potential use cases of the system. 
   - Focus on versatility: the system should be adaptable to various environments and applications (gaming, robotics, HTML canvas interactions, etc.).

### 2. **Input Modality Design**
   - Develop a flexible input module that can interface with various input types (hand pose detection, keyboard, custom hardware buttons, color detection, etc.).
   - Use a plug-and-play architecture to allow easy integration or removal of input types.

### 3. **Output/Interaction Design**
   - Design an output module that can interface with different types of output systems (games, HTML canvases, robotics, notifications, etc.).
   - Ensure scalability to accommodate future technologies and applications.

### 4. **User Management and Database Integration**
   - Develop a robust user management system that can connect with various databases.
   - Ensure security and privacy in user data handling.
   - Consider using cloud-based services for scalability and flexibility.

### 5. **Software Architecture**
   - Opt for a microservices architecture to allow for independent development, deployment, and scaling of different parts of the system.
   - Use APIs to facilitate communication between different modules of the system.

### 6. **Technology Stack**
   - Select a technology stack that supports flexibility and scalability (e.g., Python for AI-related modules, JavaScript/HTML5 for web-based interfaces).
   - Consider open-source frameworks to benefit from community support and collaboration.

### 7. **Prototyping and Testing**
   - Begin with a minimal viable product (MVP) focusing on core functionalities.
   - Use iterative development: test, get feedback, and improve.
   - Involve potential users early in the testing phase to gather relevant feedback.

### 8. **Future-proofing**
   - Design with future advancements in mind. The system should be easily updatable as new technologies emerge.
   - Keep abreast of technological trends and advancements in interactive systems.

### 9. **Collaboration and Community Involvement**
   - Engage with the developer and user communities for feedback and ideas.
   - Consider open-sourcing parts of the project to foster community contributions and innovation.

### 10. **Documentation and Support**
   - Provide comprehensive documentation for users and developers.
   - Set up a support system for troubleshooting and community assistance.

### Conclusion
Building a system as dynamic as the one you've envisioned requires a balance between current technological capabilities and future adaptability. Focus on creating a modular, scalable, and user-friendly system that can evolve with technological advancements and changing user needs.






# Design Case

## Question:

If I needed to build a single standalone experience that was being installed into a museum. If I was to use a HTML Canvas game that was hosted in ReactJS and it was going to be controled by head position, what would be the best way to build the system?

For example would I use a Python to track head position and then the ReactJS app would connect to the Python API to get the head position live?
Or should it be that the Python app sends the data to the reactJS API?


## Answer:

https://chat.openai.com/share/c2f4c826-c0a0-4db1-9e14-875e6e9e93c8

