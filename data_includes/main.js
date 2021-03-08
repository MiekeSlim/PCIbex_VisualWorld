PennController.ResetPrefix(null) // Shorten command names (keep this)
PennController.DebugOff() // Don't show the debug window
// Resources are hosted as ZIP files on a distant server
AddHost("https://users.ugent.be/~mslim/VW_DWR_Stimuli/audio/");
AddHost("https://users.ugent.be/~mslim/VW_DWR_Stimuli/images/");

// PHP script that receives, stores (and will also output) the eye-tracking data
EyeTrackerURL("https://users.ugent.be/~mslim/PCIbexData/EyeTracker.php")

Header(
    newImage("logo", "logo_UGent_EN_RGB_2400_color.png")
        .size("10vw")       
        .print("center at 25%","top at 5%")
    ,
    newImage("logo2", "icon_UGent_PP_EN_RGB_2400_color.png")
        .size("20vw")       
        .print("center at 70%","top at 5%")                                         
    )

// Check preload of required files:
CheckPreloaded("CheckPreload")


// Check for L1
PennController("Checks",         
    newText("Consent", "Two short questions before we begin: <br><br> We will use your webcam to collect data on where you are looking on the screen. We will <b> not </b> collect any video data or any other type of data that may reveal your identity. Do you give us permission to use your webcam?<br><br>")
    ,
    newCanvas( "myCanvas", "60vw" , "20vh")
        .settings.add(0,0, getText("Consent"))
        .print("20vw", "20vh")
    ,    
    newButton("yesConsent", "Yes, I give my permission")
    ,
    newButton("noConsent", "No, I don't give my permission")
        .settings.before( getButton("yesConsent") )
        .print("20vw" , "32vh")
    ,
    newSelector("yesnoConsent")
        .settings.add( getButton("yesConsent") , getButton("noConsent"))
        .wait()
    ,
    getSelector("yesnoConsent")
        .settings.log()
        .test.selected(getButton("yesConsent") )
        .failure(
            newCanvas("NoPermision", "60vw" , "20vh").settings.add(0,0, newText("<br><br>Unfortunately you cannot participate in this study. Please close the experiment by closing the browser (you can ignore possible pop-up screens) <br><br>"))
                .print("20vw", "32vh")
            ,
            newButton("waitforever")
                .wait()
        )         
    ,          
    newText("Chrome", "This study only works well if you are using the Google Chrome browser on a laptop or desktop computer (so not on a mobile phone or tablet). Are you currently using <b> Google Chrome Desktop </b>? <br><br>")
    ,
    newCanvas( "myCanvas", "60vw" , "20vh")
        .settings.add(0,0, getText("Chrome"))
        .print("20vw", "40vh")
    ,    
    newButton("yesChrome", "Yes, I am currently using Chrome Desktop")
    ,
    newButton("noChrome", "No, I am using another browser/device")
        .settings.before( getButton("yesChrome") )
        .print("20vw" , "50vh")
    ,
    newSelector("yesnoChrome")
    .center()       
        .settings.add( getButton("yesChrome") , getButton("noChrome"))
        .wait()
    ,
    getSelector("yesnoChrome")
        .settings.log()
        .test.selected(getButton("yesChrome") )
        .failure(
            newCanvas("WrongBrowser", "60vw" , "20vh").settings.add(0,0, newText("<br><br>Unfortunately, this experiment only works on Google Chrome (which can be downloaded for free). Please close the experiment by closing the browser (you may ignore possible pop-up screens), and come back on Chrome.<br><br>"))
                .print("20vw" , "50vh")
            ,
            newButton("waitforever")
                .wait()
        )      
)

// Welcome text
newTrial("Welcome",
    newText("WelcomeText", "Welcome and thank you for participating in this experiment.<br><br>Cognitive scientists often record eye movements to study human behavior, because eye movements tell a lot about how we divide our attention and how we make decisions. Typically, expensive eye-tracking devices are used to record eye movements. The aim of this experiment is to test whether we could also use webcams to achieve this goal. <br><br>The task is very simple and should take roughly 25-30 minutes to complete (there will be a break in the middle). All you have to do is listen to short sentences while four images are presented on your computer screen. Feel free to look anywhere, as long as it is on your computer screen. Your webcam will be used to follow your eye movements on the task. <br><br>We will <b>not</b> collect any video data or any other type of data that may reveal your identity. We only collect data on where on the screen your eyes are looking during the experiment.<br><br>Unfortunately, the experiment may not work for everyone: Sometimes the webcam is not able to pick up your eye movements (for a variety of possible reasons). We will test in a moment whether the experiment works for you. In case it doesn’t, you will be redirected to another experiment in which you will judge English sentences (which doesn't require a webcam). This way, you can still earn your reward on Prolific.<br><br>It is important that you are in a well-lit and quiet environment, otherwise the webcam may not be able to pick up your eye movements. Please turn off any devices or applications that may distract you during this task (such as your mobile phone or your email application) and please close other websites that you may have open.<br><br>If you have any questions about this experiment, feel free to get in touch with me (Mieke Slim) via email: mieke.slim@ugent.be <br><br> Press <b>SPACE</b> to continue. <br><br>The next pages will appear in fullscreen. <b>Please do not close the fullscreen for the remainder of this experiment. </b>")
    ,
    newCanvas("InstructionsCanvas", "60vw" , "20vh")
        .add(0,0, getText("WelcomeText"))
        .print("center at 50%", "top at 25%") 
    ,
    newKey("next", " ")
        .wait()
)
.setOption("hideProgressBar", true) 

//Consent text:
newTrial("Consent",
    newHtml("consent_form", "consent.html")
        .center()
        .cssContainer({"width":"720px"})
        .checkboxWarning("You must consent before continuing.")
        .print()
    ,
    newButton("continue", "Click to continue")
        .center()
        .print()
        .wait(getHtml("consent_form").test.complete()
                  .failure(getHtml("consent_form").warn())
        )
    ,
    fullscreen()
)
.setOption("hideProgressBar", true) 

/*
//Prolific ID
PennController("ProlificID_trial",   
    defaultText
        .print()
    ,
    newText("<p>Please fill in your Prolific ID below, so we can process your payment</p>")
    ,
    newTextInput("ProlificID")
        .print()
    ,
    newButton("Continue")
        .print()
        .wait()
    ,
    newVar("ProlificID")
        .settings.global()
        .set( getTextInput("ProlificID") )
    )
    .log( "ProlificID" , getVar("ProlificID") )
*/

// Welcome page 2
PennController("WebcamSetUp",
    newText("WebcamSetUpText", "The next pages will help you set up the audio and webcam. The webcam will be set up in a simple calibration procedure. During this calibration, you will see a video of your webcam stream. Again, we will not save any recordings of this video stream. Please make sure your face is fully visible, and that you sit centrally in front of your webcam by following the instructions in the picture below.<br><br>You can start the calibration procedure by clicking on the start button that will appear on the middle of the screen.<br><br>In the calibration procedure, you will see eight buttons on your screen. Please click on all these buttons and follow your cursor closely with your eyes. Once you've clicked on all buttons, a new button will appear in the middle of the screen. Please click on this button and look at it for three seconds so the algorithm can check whether it's well calibrated.<br><br>In case calibration fails, the last step will be repeated. If the calibration procedure fails five times in a row, you will be redirected to another experiment that doesn't require a webcam (so you can still earn your reward on Prolific).<br><br> Press <b>SPACE</b> to continue to the next trial")
    ,
    newImage("Instructions", "Instructions.png")
        .size("60vw")
    ,
    newCanvas("InstructionsCanvas", "60vw" , "20vh")
        .add(0,0, getText("WebcamSetUpText"))
        .print("center at 50%", "top at 25%") 
    ,
    getImage("Instructions")
        .print("center at 50%", "top at 60%")
    ,
    newKey("next", " ")
        .wait( newEyeTracker("tracker").test.ready() )
)
.setOption("hideProgressBar", true) 


// Calibration page
newTrial("Calibration",  
    newText("NoAttempts", "Attempts left: ")
        .settings.after( newText("attempts", "5") )
    ,
    newVar("calibrationattempts", 5)
    ,
    getText("attempts") 
        .settings.text( getVar("calibrationattempts") )
    ,
    newCanvas("FailedCalibration", "60vw" , "60vh")
        .settings.add("center at 50%", "top at 5%", newText("Unfortunately, the calibration failed. Let's try again!"))
        .settings.add("center at 50%", "top at 10%", getText("NoAttempts"))
    ,
    getEyeTracker("tracker")
        .calibrate(0)
        .test.score(60)
            .failure(
                getVar("calibrationattempts")
                    .set( v => v-1 ) 
                ,
                getText("attempts") 
                   .settings.text( getVar("calibrationattempts"))
                ,
                getCanvas("myCanvas").remove()
                ,
                getCanvas("FailedCalibration")
                    .print("center at 50%", "top at 40%")
                ,
                newButton("Retry")
                    .print("center at 50%", "top at 50%")
                    .wait(newEyeTracker("tracker").test.ready())
                    .remove()
                ,
                getCanvas("FailedCalibration")
                    .remove()
                ,
                getEyeTracker("tracker")
                    .calibrate()
                    .test.score(60)
                        .failure(
                            getVar("calibrationattempts")
                                .set( v => v-1 ) 
                            ,
                            getText("attempts") 
                                .settings.text( getVar("calibrationattempts")) 
                            ,
                            getCanvas("myCanvas").remove()
                            ,
                            getCanvas("FailedCalibration")
                                .print("center at 50%", "top at 40%")
                            ,
                            newButton("Retry")
                                .print("center at 50%", "top at 50%")
                                .wait(newEyeTracker("tracker").test.ready())
                                .remove()
                            ,
                            getCanvas("FailedCalibration")
                                .remove()
                            ,
                            getEyeTracker("tracker")
                                .calibrate()
                                .test.score(60)
                                    .failure(
                                        getVar("calibrationattempts")
                                            .set( v => v-1 ) 
                                        ,
                                        getText("attempts") 
                                            .settings.text( getVar("calibrationattempts")) 
                                        ,
                                        getCanvas("myCanvas").remove()
                                        ,
                                        getCanvas("FailedCalibration")
                                            .print("center at 50%", "top at 40%")
                                        ,
                                        newButton("Retry")
                                            .print("center at 50%", "top at 50%")
                                            .wait(newEyeTracker("tracker").test.ready())
                                            .remove()
                                            ,
                                        getCanvas("FailedCalibration")
                                            .remove()
                                        ,
                                        getEyeTracker("tracker")
                                            .calibrate()
                                            .test.score(60)
                                                .failure(
                                                    getVar("calibrationattempts")
                                                        .set( v => v-1 ) 
                                                    ,
                                                    getText("attempts") 
                                                        .settings.text( getVar("calibrationattempts")) 
                                                    ,
                                                    getCanvas("myCanvas").remove()
                                                    ,
                                                    getCanvas("FailedCalibration")
                                                        .print("center at 50%", "top at 40%")
                                                    ,
                                                    newButton("Retry")
                                                        .print("center at 50%", "top at 50%")
                                                        .wait(newEyeTracker("tracker").test.ready())
                                                        .remove()
                                                    ,
                                                    getCanvas("FailedCalibration")
                                                        .remove()
                                                    ,
                                                    getEyeTracker("tracker")
                                                        .calibrate()
                                                        .test.score(60)
                                                            .failure(
                                                            getCanvas("myCanvas").remove()
                                                            ,
                                                            newText("FailedCalibration5","Unfortunately, the calibration failed again. It seems that your webcam is not suitable for this task. Do you want to participate in another task (which doesn't require a webcam), and still earn your reward on Prolific?<br> Please click on this link: <strong>insert link</strong>. <br> If you do not want to participate in another task, please close the browser (you may ignore pop-up browsers). <br>If you have any questions, feel free to contact me via mieke.slim@ugent.be <br> Thank you for your participation!")
                                                                .print("center at 50%", "middle at 50%")
                                                            ,
                                                            newButton("waitforever").wait() // Not printed: wait on this page forever
                                                        ) 
                                                )    
                                )
                            )
                        )
        )
        .noHeader()
        .setOption("hideProgressBar", true)

// Audio set-up
PennController("AudioSetUp",
    newText("AudioInstructions", "Now that you have set up and calibrated the webcam, let’s set up the audio. In this experiment, you will hear a number of sentences. You can play one of the sentences that will be used in the experiment by clicking the play button below. Please use this audio recording to adjust your volume. Feel free to replay this sentence as often as you need. Once you’re ready, you can go to the next page.")
    ,
    newAudio("Volume_sentence", "practice_engels_Sarah_Mary_hits_a_boy_2_ok.wav")
    ,
    newCanvas( "myCanvas", "60vw" , "60vh")
        .settings.add(0,0, getText("AudioInstructions"))
        .settings.add("center at 50%", "top at 20%", getAudio("Volume_sentence"))
        .print("center at 50%", "top at 25%") 
    ,
    newButton("Take me to the next page")
        .center()
        .print("center at 50%", "top at 50%") 
        .wait()
)
    .setOption("hideProgressBar", true) 
    
// Audio check
newTrial("AudioCheck",
    newText("AudioCheckUp", "Now that the audio volume is set, please listen to the audio file presented below. After you listened to the sentence, please type in the sentence you heard in the field that appears.<br><br>Please listen carefully, because <b>you can only listen to the sentence once.</b><br><br> Feel free to move your head if you want to look at your keyboard while typing. ")
    ,
    newCanvas( "myCanvas", "60vw" , "60vh")
        .settings.add(0,0, getText("AudioCheckUp"))
        .print("center at 50%", "top at 25%")
    ,    
    newAudio("Check_sentence", "practice_engels_Sarah_Mary_has_a_diamond_ok.wav")
        .center()
        .print("center at 50%", "top at 40%")
        .wait()
        .remove()
    ,
    newTextInput("AudioCheckInput", "Type in the sentence you heard")
            .center()
            .log()
            .lines(0)
            .size(400, 50)
            .print("center at 50%", "top at 40%")
    ,  
    newButton("Take me to the next page")
        .print("center at 50%", "top at 45%")
        .wait()
)
    .setOption("hideProgressBar", true) 

// Experiment instructions:
newTrial("Instructions", 
    newText("TaskInstructions", "<p>You're all set to start the experiment! You will hear a couple of short sentences while you look at the screen. Feel free to look anywhere, as long as it's on the screen.<br><br>Before each trial, you will see a button in the middle of your screen. Click on this button and look at it for three seconds. The webcam will check whether it is still calibrated. If it is, the trial will automatically start after three seconds. Otherwise, the calibration procedure will be repeated. <br><br>During the trials, you don't need to click on anything: Just listen and watch! <br><br>We’ll first start with two practice trials, so you will know how the experiment works. Then, we will continue to the experiment. This experiment should take roughly 20 minutes to complete, and there will be a break in the middle.<br><br>Please make sure you keep your head as still as possible throughout the experiment (of course, with the exception of the break)")
    ,
    newCanvas("myCanvas", 800 , 300)
        .settings.add(0,0, getText("TaskInstructions"))
        .print("center at 50%", "top at 25%")   
    ,
    newButton("Take me to the practise trials")
        .center()
        .print("center at 50%", "top at 50%")
        .wait()
)
    .setOption("hideProgressBar", true) 
 

//Trials: Practise
Template("Practise.csv", row =>
    newTrial("PractiseSession",
        //show cursor     
        newFunction( ()=>{
            $("body").css({
                width: '100vw',
                height: '100vh',
                cursor: 'default'
           });
        }).call()
        ,
        newEyeTracker("tracker")
            .calibrate(60)  // Make sure that the tracker is still calibrated
            .log()  // log the calibration scores
        ,
        defaultImage.size("20vh", "20vh")
        ,
        newVar("TargetPosition")
            .set("Nothing")
        ,
    images = [row.image1,row.image2,row.image3,row.image4].sort(v=>Math.random()-Math.random())
    ,
    newCanvas("image1", "50vw", "50vh")
      .add("center at 50%", "middle at 50%", newImage(images[0]))
      .print("center at 25%", "middle at 25%")
    ,
    newCanvas("image2", "50vw", "50vh")
      .add("center at 50%", "middle at 50%", newImage(images[1]))
      .print("center at 25%", "middle at 75%")
    ,
    newCanvas("image3", "50vw", "50vh")
      .add("center at 50%", "middle at 50%", newImage(images[2]))
      .print("center at 75%", "middle at 25%")
    ,
    newCanvas("image4", "50vw", "50vh")
      .add("center at 50%", "middle at 50%", newImage(images[3]))
      .print("center at 75%", "middle at 75%")
    ,
    getEyeTracker("tracker")
        // We track the Canvas: making them bigger allows us to capture look-estimates slightly off the images themselves
        .add( getCanvas("image1") , getCanvas("image2") , getCanvas("image3") , getCanvas("image4") )
        .start()
        .log()  // IMPORTANT: if you don't log, the eye-tracking data will NOT get sent        
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
        newTimer(2200).start().wait()
        ,
        newAudio("test", row.audio)
            .log()
            .play()
            .wait()
        ,
        newTimer(500).start().wait()
        ,     
        getEyeTracker("tracker").stop() // Stop now to prevent collecting unnecessary data
        ,
        fullscreen()
        )
    .setOption("hideProgressBar", true)
    .noHeader()     
    .log( "image1"              , row.image1                )
    .log( "image2"              , row.image2                )            
    .log( "image3"              , row.image3                )   
    .log( "image4"              , row.image4                )
    .log("toplefttimage"        , images[0]                 )
    .log("bottomleftimage"      , images[1]                 )
    .log("toprightimage"        , images[2]                 )
    .log("bottomrightimage"     , images[3]                 )
    .log( "targetposition"      , getVar("TargetPosition")  )
    .log( "sentence"            , row.audio                 )           
    .log( "stimulustype"        , row.stimulustype          )  
    .log( "stimuluscondition"   , row.stimuluscondition     )       
)

newTrial("EndOfPractise", 
    //show cursor     
    newFunction( ()=>{
        $("body").css({
            width: '100vw',
            height: '100vh',
            cursor: 'default'
           });
        }).call()
    ,
    newText("EndOfPractiseText", "Those were the two practice trials. Please click on the button below to start the experiment.")
    ,
    newCanvas("myCanvas", 800 , 300)
        .settings.add("center at 50%",0, getText("EndOfPractiseText"))
        .print("center at 50%", "top at 25%")   
    ,
    newButton("Start the experiment")
        .center()
        .print("center at 50%", "top at 40%")
        .wait()
)
    .setOption("hideProgressBar", true) 

//Trials: Block A
Template("TryA.csv", row =>
    newTrial("BlockA",
        //show cursor     
        newFunction( ()=>{
            $("body").css({
                width: '100vw',
                height: '100vh',
                cursor: 'default'
           });
        }).call()
        ,
        newEyeTracker("tracker")
            .calibrate(60)  // Make sure that the tracker is still calibrated
            .log()  // log the calibration scores
        ,
        defaultImage.size("20vh", "20vh")
        ,
        newVar("TargetPosition")
            .set("Nothing")
        ,
    images = [row.image1,row.image2,row.image3,row.image4].sort(v=>Math.random()-Math.random())
    ,
    newCanvas("image1", "50vw", "50vh")
      .add("center at 50%", "middle at 50%", newImage(images[0]))
      .print("center at 25%", "middle at 25%")
    ,
    newCanvas("image2", "50vw", "50vh")
      .add("center at 50%", "middle at 50%", newImage(images[1]))
      .print("center at 25%", "middle at 75%")
    ,
    newCanvas("image3", "50vw", "50vh")
      .add("center at 50%", "middle at 50%", newImage(images[2]))
      .print("center at 75%", "middle at 25%")
    ,
    newCanvas("image4", "50vw", "50vh")
      .add("center at 50%", "middle at 50%", newImage(images[3]))
      .print("center at 75%", "middle at 75%")
    ,
    getEyeTracker("tracker")
        // We track the Canvas: making them bigger allows us to capture look-estimates slightly off the images themselves
        .add( getCanvas("image1") , getCanvas("image2") , getCanvas("image3") , getCanvas("image4") )
        .start()
        .log()  // IMPORTANT: if you don't log, the eye-tracking data will NOT get sent        
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
        newTimer(2200).start().wait()
        ,
        newAudio("test", row.audio)
            .log()
            .play()
            .wait()
        ,
        newTimer(500).start().wait()
        ,     
        getEyeTracker("tracker").stop() // Stop now to prevent collecting unnecessary data
        ,
        fullscreen()
        )
    .setOption("hideProgressBar", true)
    .noHeader()     
    .log( "image1"              , row.image1                )
    .log( "image2"              , row.image2                )            
    .log( "image3"              , row.image3                )   
    .log( "image4"              , row.image4                )
    .log("toplefttimage"        , images[0]                 )
    .log("bottomleftimage"      , images[1]                 )
    .log("toprightimage"        , images[2]                 )
    .log("bottomrightimage"     , images[3]                 )
    .log( "targetposition"      , getVar("TargetPosition")  )
    .log( "sentence"            , row.audio                 )           
    .log( "stimulustype"        , row.stimulustype          )  
    .log( "stimuluscondition"   , row.stimuluscondition     )       
)

PennController("BlinkBreak",
   //show cursor     
   newFunction( ()=>{
    $("body").css({
        width: '100vw',
        height: '100vh',
        cursor: 'default'
           });
        }).call()
    ,     
    newText("BlinkBreakText", "This was the first block! Feel free to take a five minute break. Please make sure that this break is not much longer than five minutes, so you won't time out on Prolific.<br><br>Click on the button below to continue to the final block of the experiment.<br><br> Make sure you are centrally seated before your webcam and to keep your head still throughout the remainder of this experiment")
    ,           
    newCanvas( "myCanvas", "60vw" , "60vh")
        .settings.add(0,0, getText("BlinkBreakText"))       
        .print("center at 50%", "middle at 50%")         
    ,      
    newButton("Take me to the next block (which will appear in fullscreen again)")
        .print("center at 50%", "top at 45%")
        .wait(newEyeTracker("tracker").test.ready())
    ,
    fullscreen()
)
.setOption("hideProgressBar", true) 


// Audio set-up
PennController("AudioSetUp2",
    newText("AudioInstructions", "You can use this audio recording, in case you need to adjust the volume again for the second block. Feel free to replay this sentence as often as you need.")
    ,
    newAudio("Volume_sentence", "practice_engels_Sarah_Mary_hits_a_boy_2_ok.wav")
    ,
    newCanvas( "myCanvas", 600 , 300)
        .settings.add(0,0, getText("AudioInstructions"))
        .settings.add("center at 50%", "top at 20%", getAudio("Volume_sentence"))
        .print("center at 50%", "top at 25%") 
    ,
    newButton("Continue to the next block")
        .print("center at 50%", "top at 60%") 
        .wait( newEyeTracker("tracker").test.ready() )
)
.setOption("hideProgressBar", true) 

//Trials: Block B
Template("TryB.csv", row =>
    newTrial("BlockB",
        //show cursor     
        newFunction( ()=>{
            $("body").css({
                width: '100vw',
                height: '100vh',
                cursor: 'default'
           });
        }).call()
        ,
        newEyeTracker("tracker")
            .calibrate(60)  // Make sure that the tracker is still calibrated
            .log()  // log the calibration scores
        ,
        defaultImage.size("20vh", "20vh")
        ,
        newVar("TargetPosition")
            .set("Nothing")
        ,
    images = [row.image1,row.image2,row.image3,row.image4].sort(v=>Math.random()-Math.random())
    ,
    newCanvas("image1", "50vw", "50vh")
      .add("center at 50%", "middle at 50%", newImage(images[0]))
      .print("center at 25%", "middle at 25%")
    ,
    newCanvas("image2", "50vw", "50vh")
      .add("center at 50%", "middle at 50%", newImage(images[1]))
      .print("center at 25%", "middle at 75%")
    ,
    newCanvas("image3", "50vw", "50vh")
      .add("center at 50%", "middle at 50%", newImage(images[2]))
      .print("center at 75%", "middle at 25%")
    ,
    newCanvas("image4", "50vw", "50vh")
      .add("center at 50%", "middle at 50%", newImage(images[3]))
      .print("center at 75%", "middle at 75%")
    ,
    getEyeTracker("tracker")
        // We track the Canvas: making them bigger allows us to capture look-estimates slightly off the images themselves
        .add( getCanvas("image1") , getCanvas("image2") , getCanvas("image3") , getCanvas("image4") )
        .start()
        .log()  // IMPORTANT: if you don't log, the eye-tracking data will NOT get sent        
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
        newTimer(2200).start().wait()
        ,
        newAudio("test", row.audio)
            .log()
            .play()
            .wait()
        ,
        newTimer(500).start().wait()
        ,     
        getEyeTracker("tracker").stop() // Stop now to prevent collecting unnecessary data
        ,
        fullscreen()
        )
    .setOption("hideProgressBar", true)
    .noHeader()     
    .log( "image1"              , row.image1                )
    .log( "image2"              , row.image2                )            
    .log( "image3"              , row.image3                )   
    .log( "image4"              , row.image4                )
    .log("toplefttimage"        , images[0]                 )
    .log("bottomleftimage"      , images[1]                 )
    .log("toprightimage"        , images[2]                 )
    .log("bottomrightimage"     , images[3]                 )
    .log( "targetposition"      , getVar("TargetPosition")  )
    .log( "sentence"            , row.audio                 )           
    .log( "stimulustype"        , row.stimulustype          )  
    .log( "stimuluscondition"   , row.stimuluscondition     )       
)

PennController.SendResults("Send");

newTrial("Final",
    //show cursor     
    newFunction( ()=>{
        $("body").css({
            width: '100vw',
            height: '100vh',
            cursor: 'default'
           });
        }).call()
    ,
    exitFullscreen()
    ,
    newText("FinalText", "You’ve completed the experiment. Thank you very much for your participation! <br><br>If you want to know more about the goals of this experiment or if you want to know the results once the experiment is done, feel free to get in touch with me (Mieke Slim) via mieke.slim@ugent.be. <br><br> You can close the experiment by closing the browser (please ignore any pop-up windows).")
    ,
    newCanvas("myCanvas", "60vw" , "60vh")
        .settings.add("center at 50%",0, getText("FinalText"))       
        .print("center at 50%", "top at 25%")   
    ,
    newButton("waitforever").wait() // Not printed: wait on this page forever
)
.setOption("countsForProgressBar",false)
