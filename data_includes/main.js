PennController.ResetPrefix(null) // Shorten command names (keep this)
PennController.DebugOff() // Don't show the debug window
// Resources are hosted as ZIP files on a distant server
AddHost("https://users.ugent.be/~mslim/VW_DWR_Stimuli/audio/");
AddHost("https://users.ugent.be/~mslim/VW_DWR_Stimuli/images/");

// PHP script that receives, stores (and will also output) the eye-tracking data
EyeTrackerURL("https://users.ugent.be/~mslim/PCIbexData/EyeTracker.php")

//Sequence("Welcome1","Welcome2", "CheckPreload", "AudioSetUp", "AudioCheck", "WebcamSetUp", "CalibrationSetUp", "Instructions", "Experiment", "QuestionnairePage", "Send",  "Final")
/*
PennController("Consent",
    newText("ConsentText", "<p>This experiment has been approved by the Ethical Comittee from the Faculty of Psychology and Educational Sciences at Ghent University. We request your consent for participation in this experiment. Therefore, please read the following carefully: </p > <p>I declare that I, as a participant in a research project in the Department of Experimental Psychology at Ghent University:<br><br> <ol> <li> have been informed about the research objectives, the questions and the tasks that I will encounter during the research and that I was given the opportunity to receive further information if desired<br><br> </li><li> will participate out of free will in the research project <br><br> </li><li> am aware that the researchers do not collect any personal information that may be used to identify my identity (such as video recordings). All the data that will be collected is completely anonymized; <br><br> </li><li> give informed consent to the researchers to store, process, and report my data in anonymized form <br><br> </li><li> am aware of the option to stop my participation in this research at any moment in time without having to provide a reason; <br><br> </li><li> know that participating or stopping my participation in the research has no negative consequences of any kind for me <br><br> </li><li> am aware of the option to ask the researcher(s) for a summary of the results after the study is finished and the results have been known; <br><br> </li><li> agree that my data may be used for further analysis by other researchers after complete anonymization; <br><br> </li><li> am aware that Ghent University is the responsible entity with regards to the personal information collected during the study. I am also aware that the data protection officer can give me more information about the protection of my personal information. Contact: Hanne Elsen (privacy@ugent.be).</li> </ol> <br>In case you give your informed consent to participate in this study, please click on the button below. If you do not give your informed consent, please close this experiment. </p>")
    ,
    newCanvas( "myCanvas", 700 , 750)
        .settings.add(0,0, getText("ConsentText"))
        .print()         
    ,
    newButton("I have read the study information and give my informed consent. Continue to the next page")
            .center()
            .print()
            .wait()
)

// Welcome page 1
PennController("Welcome1",
    newText("WelcomeText", "<p>Welcome and thank you for participating in this study! </p><p> </p><p> In this experiment, you will listen to short sentences while you look at images on your computer screen. Your webcam will be used to follow your eye movements during this task. It is therefore important that you are in a well-lit and quiet environment (you can use headphones). <br><br> Please turn off your mobile phone or other devices that may distract you during this task. Also, please close other websites that you may have open.</p><p> </p><p> Unfortunately, this experiment only works of you use <b> Google Chrome </b> or <b> Mozilla Firefox </b>. Please close the experiment now if you are not using one of these two browsers.</p>")
    ,
    newCanvas( "myCanvas", 600 , 300)
        .settings.add(0,0, getText("WelcomeText"))
        .print()         
    ,
    newTextInput("Subject", randomnumber = Math.floor(Math.random()*1000000))    
    ,
    newVar("Subject")
        .settings.global()
        .set( getTextInput("Subject") )
    ,           
    newButton("Take me to the next page")
        .center()
        .print()
        .wait()
)
    .log( "Subject" , getVar("Subject") )

// Welcome page 2
PennController("Welcome2",
    newText("WelcomeText", "<p> The task in this experiment is very simple: You will listen to a couple of short sentences while you look at your computer screen. Your webcam will follow your eye movements. The next pages will help you set up the audio and webcam. <br><br> The webcam will be set up in a simple calibration procedure. During this calibration, you will see a video of your webcam stream. Importantly, we will not save these video recordings.  We will only collect data on your eyemovements on the computer screen. <b> We will not collect or save any video recordings from your webcam or any other type of information that may reveal your identity. </b> <br><br> If you have any questions about this experiment, you can contact me via email: mieke.slim@ugent.be </p>")
    ,
    newCanvas( "myCanvas", 600 , 300)
        .settings.add(0,0, getText("WelcomeText"))
        .print()
    ,
    newButton("Take me to the next page")
        .center()
        .print()
        .wait()
)
*/
// Wait if the resources have not finished preloading by now
CheckPreloaded("CheckPreload")
               
// Audio set-up
PennController("AudioSetUp",
    newText("AudioInstructions", "<p>Here, you can play one of the sentences that will be used in the experiment. Please use this audio recording to adjust your volume. Feel free to replay this sentence as often as you need.</p>")
    ,
    newAudio("Volume_sentence", "practice_engels_Sarah_Mary_hits_a_boy_2_ok.wav")
    ,
    newCanvas( "myCanvas", 600 , 300)
        .settings.add(0,0, getText("AudioInstructions"))
        .settings.add(140, 200, getAudio("Volume_sentence"))
        .print()
    ,
    newButton("Take me to the next page")
        .center()
        .print()
        .wait()
)

// Audio check
newTrial("AudioCheck",
    newText("AudioCheckUp", "<p>Now that the audio volume is set, please listen to the audio file presented below. After you listened to the sentence, please type in the sentence you heard in the field that appears. Please listen carefully, because <b> you can only listen to the sentence once </b> </p>")
    ,
    newTextInput("AudioCheckInput", "Type in the sentence you heard")
    .settings.lines(0)
    .settings.size(400, 50)
    ,
    newCanvas( "myCanvas", 600 , 100)
        .settings.add(0,0, getText("AudioCheckUp"))
        .print()
    ,    
    newAudio("Check_sentence", "practice_engels_Sarah_Mary_has_a_diamond_ok.wav")
        .center()
        .print()
        .wait()
        .remove()
    ,
    newTextInput("AudioCheckInput", "Type in the sentence you heard")
            .center()
            .log()
            .lines(0)
            .size(400, 50)
            .print()
    ,  
    newButton("Take me to the next page")
        .center()
        .print()
        .wait()
)

newTrial("WebcamSetUp", 
    newText("WebcamInstructions", "<p>Now that your audio is set, we need to calibrate your webcam so the experiment can follow your eye movements. On the next page, a calibration procedure will start. First, you will see the webcam recording on the top left corner of your screen. <br><br> Please make sure your face is fully visible. Glasses should not be a problem, but make sure that they are not reflecting any ambient light. Also, you can wear headphones.</p>")
    ,
    newImage("Instructions", "Instructions.png")
        .size(1200,300)
    ,
    newCanvas("myCanvas", 1200 , 500)
        .settings.add(0,0, getText("WebcamInstructions"))
        .settings.add(0,100, getImage("Instructions"))
        .print()
    ,
    newButton("Take me to the next page (which will appear in fullscreen)")
        .center()
        .print()        
        .wait( newEyeTracker("tracker").test.ready() ) 
    ,
    fullscreen()
)

// Calibration page
newTrial("CalibrationSetUp",
    newText("CalibrationInstructions", "<p>In the calibration procedure, you will see eight buttons on your screen. Please click on all these buttons and follow your cursor closely with your eyes. Once you've clicked on all buttons, a new button will appear in the middle of the screen. Please click on this button and look at it for three seconds so the algorithm can check whether it's well calibrated.</p> <p> In case calibration fails, the procedure will be repeated. </p>")
    ,
    newCanvas("myCanvas", 1200 , 100)
        .settings.add(0,0, getText("CalibrationInstructions"))
        .print()    
    ,
    newButton("Begin calibration")
        .center()
        .print()
        .wait( newEyeTracker("tracker").test.ready() )
        .remove()
    ,
    getEyeTracker("tracker").calibrate(60)
        .log()
)

// Experiment instructions
newTrial("Instructions", 
    newText("TaskInstructions", "<p>You're all set to start the experiment! First, two trials will follow in which you won't hear anything, but see a picture appear in one of the four corners of the screen. Please look at this picture. <br> <br> After these two trials, the experimental trials will begin. In these experimental trials, the task is very simple: You will hear a couple of short sentences while you look at four pictures shown on the screen. The webcam will follow your eye movements during this task. <br><br> After the experimental trials, two trials will be shown again in which you will see one picture appear in one of the corners of the screen. Again, just look at this picture untill the next trial begins! <br> <br> Before each trial, you will see a button in the middle of your screen. Click on this button and look at it for three seconds. The webcam will check whether it is still calibrated. If it is, the trial will automatically start after three seconds. Otherwise, the calibration procedure will be repeated. <br><br>  During the trials, you don't need to click on anything: Just listen and watch!</p>")
    ,
    newCanvas("myCanvas", 800 , 300)
        .settings.add(0,0, getText("TaskInstructions"))
        .print()    
    ,
    newButton("Take me to the first trial")
        .center()
        .print()
        .wait()
)

// Experimental trials
Template("ListA.csv", row =>
    newTrial("Block1",
        //show cursor     
        newFunction( ()=>{
            $("body").css({
                width: '100vw',
                height: '100vh',
                cursor: 'default'
           });
        }).call()
        ,    
        newEyeTracker("tracker").calibrate(60)  // Make sure that the tracker is still calibrated
        ,
        defaultImage.size("20vh", "20vh")
        ,
        // We print the four images at the four corners
        newCanvas("target_image", "40vw", "40vh")  // The Canvas are bigger than the images they contain
            .add( "center at 50%" , "middle at 50%" , newImage(row.Image1) )
            .print( "center at 25vw" , "middle at 25vh" )
        ,
        newCanvas("distractor_image1", "40vw", "40vh")
            .add( "center at 50%" , "middle at 50%" , newImage(row.Image2) )
            .print( "center at 25vw" , "middle at 75vh" )
        ,
        newCanvas("distractor_image2", "40vw", "40vh")
            .add( "center at 50%" , "middle at 50%" , newImage(row.Image3) )
            .print( "center at 75vw" , "middle at 25vh" )
        ,
        newCanvas("distractor_image3", "40vw", "40vh")
            .add( "center at 50%" , "middle at 50%" , newImage(row.Image4) )
            .print( "center at 75vw" , "middle at 75vh" )
        ,
        // Hide the mouse cursor
        newFunction( ()=>{
            $("body").css({
                width: '100vw',
                height: '100vh',
                cursor: 'none'
           });
        }).call()
        ,    
        newSelector("Selector") //The only purpose of this selector is to randomise the positioning of the images on the screen
            .add(getCanvas("target_image") , getCanvas("distractor_image1") , getCanvas("distractor_image2") , getCanvas("distractor_image3"))
            .shuffle()             
            .remove()
        ,
        newTimer(2200).start().wait()
        , 
        getEyeTracker("tracker")
            // We track the Canvas: making them bigger allows us to capture look-estimates slightly off the images themselves
            .add( getCanvas("target_image") , getCanvas("distractor_image1") , getCanvas("distractor_image2") , getCanvas("distractor_image3") )
            .start()
            .log()  // IMPORTANT: if you don't log, the eye-tracking data will NOT get sent                    
        ,
        newTimer(1500)
            .start()
            .wait()
        ,
        getEyeTracker("tracker").stop() // Stop now to prevent collecting unnecessary data  
        )
    .log( "target_image"        , row.Image1         )
    .log( "distractor_image1"   , row.Image2     )            
    .log( "distractor_image2"   , row.Image3         )   
    .log( "distractor_image3"   , row.Image4          )            
    .log( "sentence"            , row.Audio          )           
    .log( "type"                , row.StimulusType          )  
    .log( "condition"           , row.StimulusCondition         )       
    .log( "Subject" , getVar("Subject") )
        )
.setOption("countsForProgressBar",false) // hide progress bar from the display in the visual world experiment

PennController.SendResults("Send");

newTrial("Final",
    exitFullscreen()
    ,
    newText("The is the end of the experiment, you can now close this window. Thank you! <br> If you have any questions, you can contact me via mieke.slim@ugent.be").print()
    ,
    newButton("waitforever").wait() // Not printed: wait on this page forever
)
.setOption("countsForProgressBar",false)
