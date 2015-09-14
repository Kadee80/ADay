//global to record

var river = "";
var school = "";
var site = "";
var server = "http://www.portaltodiscovery.org/aday/string.php"
var backupFile = " "
var writeMe;
var data = "";
//BOILERPLATE STARTING FUNCTIONS
var watchGPSID = null;
//variables for background recording
var lon = null;
var lat = null;
var date = null;
document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {
    phonegapLoaded();
}


function phonegapLoaded() {

    watchGPSID = navigator.geolocation.watchPosition(watchGPSSuccess, watchGPSError, {
        maximumAge: 10000,
        timeout: 30000,
        enableHighAccuracy: true
    });

}

//WATCH GPS DATA
function watchGPSSuccess(position) {
    // var gpsInfo = document.getElementById('gpsInfo');
    // gpsInfo.innerHTML = 
    //       'Latitude: '          + position.coords.latitude          + '<br>' +
    //       'Longitude: '         + position.coords.longitude         + '<br>' +
    //       'Accuracy: '          + position.coords.accuracy          + '<br>' +
    //       'Timestamp: '         + new Date(position.timestamp)     + '<br>';
    lat = position.coords.latitude;
    lon = position.coords.longitude;

    date = new Date(position.timestamp);

}

function watchGPSError(error) {
    alert(error.message);
}

//CAMERA JUNK



var cameraOptions = {
    quality: 75,
    destinationType: Camera.DestinationType.FILE_URI,
    sourceType: Camera.PictureSourceType.CAMERA,
    allowEdit: false,
    encodingType: Camera.EncodingType.JPEG,
    saveToPhotoAlbum: true
};


function takePic() {
    navigator.camera.getPicture(onSuccess, onFail, cameraOptions);
}

function onSuccess(imageURI) {
    // var image = document.getElementById('myImage');
    // image.width = width;
    // image.src = imageURI;
    // alert(imageURI);

    var gotFileEntry = function(fileEntry) {
        //alert("got image file entry: " + fileEntry.fullPath);
        var gotFileSystem = function(fileSystem) {

            fileSystem.root.getDirectory("ADAY", {
                create: true
            }, function(dataDir) {

                // copy the file
                fileEntry.moveTo(dataDir, lat + "-" + lon + ".jpg", null, fsFail);

            }, dirFail);

        };
        // get file system to copy or move image file to
        window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, gotFileSystem,
            fsFail);
    };
    // resolve file system for image
    window.resolveLocalFileSystemURI(imageURI, gotFileEntry, fsFail);

    // file system fail
    var fsFail = function(error) {
        alert("failed with error code: " + error.code);

    };

    var dirFail = function(error) {
        alert("Directory error code: " + error.code);

    };
}

function onFail(message) {
    alert('Failed because: ' + message);
}



//sample backup data
function backupData(f, func) {
    writeMe = func;
    backupFile = f;
    // var latitude = document.getElementById("lat");
    // tempLat = latitude.value;

    // var longitude = document.getElementById("lon");
    // var tempLon = longitude.value;

    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, gotFS, fail);
}

function gotFS(fileSystem) {

fileSystem.root.getDirectory("ADAY", {create: true}, gotDir);

}

function gotDir(dirEntry){
     dirEntry.getFile(backupFile, {
        create: true,
        exclusive: false
    }, gotFE, fail);
}

function gotFE(fileEntry) {

    fileEntry.createWriter(writeMe, fail);
}

function writeTide(writer) {
    writer.onwriteend = function(evt) {
        //alert("recorded");

    };
    var len = writer.length;
    writer.seek(len);
     if (len == 0) {
        writer.write("latitude,longitude,date \n"+lat+","+lon +","+date+ "\n" );
    } else {
        writer.seek(len);
        writer.write(lat+","+lon + ","+date +"\n");

    }
}

function writeCurrent(writer) {
    writer.onwriteend = function(evt) {
        //alert("recorded");

    };
    var len = writer.length;
    writer.seek(len);
     if (len == 0) {
        writer.write("latitude,longitude,date \n"+lat+","+lon +","+date+ "\n" );
    } else {
        writer.seek(len);
        writer.write(lat+","+lon + ","+date +"\n");

    }
}

function writeWeather(writer) {
    writer.onwriteend = function(evt) {
        //alert("recorded");

    };
    var len = writer.length;
    writer.seek(len);
    if (len == 0) {
        writer.write("latitude,longitude,date \n"+lat+","+lon +","+date+ "\n" );
    } else {
        writer.seek(len);
        writer.write(lat+","+lon + ","+date +"\n");

    }
}

function writeWind(writer) {
    writer.onwriteend = function(evt) {
        //alert("recorded");

    };
    var len = writer.length;
    writer.seek(len);
    if (len == 0) {
        writer.write("latitude,longitude,date \n"+lat+","+lon +","+date+ "\n" );
    } else {
        writer.seek(len);
        writer.write(lat+","+lon + ","+date +"\n");

    }
}

function fail(error) {
    console.log(error.code);
}



/////////////////////////

function setInfo(r,sc,si,la,lo,d){
    var tr = r;
    var tsc = sc;
    var tsi = si;
    var tla = la;
    var tlo = lo;
    var td = d;

    document.getElementById(tr).value = river;
   
    document.getElementById(tsc).value = school;

    document.getElementById(tsi).value = site;

    document.getElementById(tla).value = lat;

    document.getElementById(tlo).value = lon;

    document.getElementById(td).value = date;

    //alert('infoSet');

    
}



function populateLogin() {
    
var riverSchoolJSONList = {
		"riverSchoolTable" : 
        [
                {"riverID" : "1","riverName" : "Nissequogue"},
                {"riverID" : "2","riverName" : "Carmans"},
        		{"riverID" : "3","riverName" : "Peconic"},
        		{"riverID" : "4","riverName" : "Connetquot"},
                {"riverID" : "5","riverName" : "Carlls"},
                {"riverID" : "6","riverName" : "Greens Creek"},
        ]};


var schoolJSONList = {

		"Nissequogue" : 
        [
                {"schoolID" : "1","schoolName" : "The Stony Brook School"},
                {"schoolID" : "2","schoolName" : "Ward Melville High School"},
                {"schoolID" : "3","schoolName" : "Hauppauge High School"},
                {"schoolID" : "4","schoolName" : "Northport High School"},
                {"schoolID" : "5","schoolName" : "Kings Park High School"},
                {"schoolID" : "6","schoolName" : "Brentwood High School"},
                {"schoolID" : "7","schoolName" : "Harbor Country Day School"},
                {"schoolID" : "8","schoolName" : "Sachem North High School"},
                {"schoolID" : "9","schoolName" : "Smithtown East High School"},
                {"schoolID" : "10","schoolName" : "Gelinas Jr. High School"},
                {"schoolID" : "11","schoolName" : "Avalon Park and Preserve"},
                {"schoolID" : "12","schoolName" : "RC Murphy Jr. High School"},
                {"schoolID" : "13","schoolName" : "Centereach High School"}
        ],
        "Carmans" : 
        [
                {"schoolID" : "1","schoolName" : "Longwood High School"},
                {"schoolID" : "2","schoolName" : "Patchogue Medford High School"},
                {"schoolID" : "3","schoolName" : "William Floyd High School"},
                {"schoolID" : "4","schoolName" : "Woodhull Elementary High School"},
                {"schoolID" : "5","schoolName" : "Girl Scouts of Suffolk County"},
                {"schoolID" : "6","schoolName" : "Longwood Middle School"},
                {"schoolID" : "7","schoolName" : "Oregon Rd Middle School"},
                {"schoolID" : "8","schoolName" : "Bellport High School"},
                {"schoolID" : "9","schoolName" : "Rocky Point High School"}
        ],
        "Peconic" : 
        [
                {"schoolID" : "1","schoolName" : "Westhampton Beach High School"},
                {"schoolID" : "2","schoolName" : "Shelter Island High School"},
                {"schoolID" : "3","schoolName" : "Southold High School"},
                {"schoolID" : "4","schoolName" : "Southold Elementary School"},
                {"schoolID" : "5","schoolName" : "Southampton High School"},
                {"schoolID" : "6","schoolName" : "Springs School"},
                {"schoolID" : "7","schoolName" : "Mattituck High School"},
                {"schoolID" : "8","schoolName" : "Cutchogue East Elementary School"},
                {"schoolID" : "9","schoolName" : "Riverhead High School"},
                {"schoolID" : "10","schoolName" : "Riverhead Middle School"},
                {"schoolID" : "11","schoolName" : "Hampton Bays Middle School"},
                {"schoolID" : "12","schoolName" : "Eastport South Manor High School"},
                {"schoolID" : "13","schoolName" : "Hay Ground School"},
                {"schoolID" : "14","schoolName" : "Oyster Ponds School"},
                {"schoolID" : "15","schoolName" : "Shoreham Wading River High School"}

        ],
        "Connetquot" : 
        [
                {"schoolID" : "1","schoolName" : "Brentwood High School"},
                {"schoolID" : "2","schoolName" : "Central Islip High School"},
                {"schoolID" : "3","schoolName" : "Connetquot High School"}
            
        ],
        "Carlls" : 
        [
                {"schoolID" : "1","schoolName" : "Babylon High School"},
                {"schoolID" : "2","schoolName" : "North Babylon High School"},
                {"schoolID" : "3","schoolName" : "Lindenhurst High School"}
        ],
        "Greens Creek" : 
        [
                {"schoolID" : "1","schoolName" : " "},
                {"schoolID" : "2","schoolName" : "Sayville High School"}
                
        ]
		};


var siteJSONList = {

		"Nissequogue" : 
        [
                {"siteID" : "1","siteName" : "Site 1"},
                {"siteID" : "2","siteName" : "Site 2"}
                
        ],
        "Carmans" : 
        [
                {"siteID" : "1","siteName" : "Site 1"},
                {"siteID" : "2","siteName" : "Site 2"}
               
        ],
        "Peconic" : 
        [
                {"siteID" : "1","siteName" : "Site 1"},
                {"siteID" : "2","siteName" : "Site 2"}
                

        ],
        "Connetquot" : 
        [
                {"siteID" : "1","siteName" : "Site 1"},
                {"siteID" : "2","siteName" : "Site 2"},
                {"siteID" : "3","siteName" : "Site 3"}
            
        ],
        "Carlls" : 
        [
                {"siteID" : "1","siteName" : "Site 1"},
                {"siteID" : "2","siteName" : "Site 2"},
                {"siteID" : "3","siteName" : "Site 3"}
        ],
        "Greens Creek" : 
        [
                {"siteID" : "1","siteName" : " "},
                {"siteID" : "2","siteName" : "Site 1"},
                
        ]
		};


    console.log( "ready!" );
//Now that the doc is fully ready - populate the lists   
//Next comes the r
      var riverListItems= "";
      for (var i = 0; i < riverSchoolJSONList.riverSchoolTable.length; i++){
        riverListItems+= "<option value='" + riverSchoolJSONList.riverSchoolTable[i].riverID + "'>" + riverSchoolJSONList.riverSchoolTable[i].riverName + "</option>";
      }
      $("#riverSelectionBox").html(riverListItems);
    
    var updateSelectSchoolBox = function(r) {
        console.log('updating with',r);
        river = r;
        var listItems= "";
        for (var i = 0; i < schoolJSONList[r].length; i++){
            listItems+= "<option value='" + schoolJSONList[r][i].schoolID + "'>" + schoolJSONList[r][i].schoolName + "</option>";
        }
        $("select#schoolSelectionBox").html(listItems);
    }

    var updateSelectSiteBox = function(r) {
        console.log('updating with',r);
        
        var listItems= "";
        for (var i = 0; i < siteJSONList[r].length; i++){
            listItems+= "<option value='" + siteJSONList[r][i].siteID + "'>" + siteJSONList[r][i].siteName + "</option>";
        }
        $("select#siteSelectionBox").html(listItems);
    }


   
    $("select#riverSelectionBox").on('change',function(){
        var selectedRiver = $('#riverSelectionBox option:selected').text();
        updateSelectSchoolBox(selectedRiver);
        updateSelectSiteBox(selectedRiver);
    });  

    $("select#schoolSelectionBox").on('change',function(){
        var selectedSchool = $('#schoolSelectionBox option:selected').text(); 
        school =  selectedSchool;
    });

    $("select#siteSelectionBox").on('change',function(){
        var selectedSite = $('#siteSelectionBox option:selected').text(); 
        site =  selectedSite;
    });

      		
};

///reset form function

function clearForm(id){
    var form = id;
    document.getElementById(form).reset();
}

///////////////////////////////////
///////group 1/////////////////////

function recordTide(){
    
    //setInfo();

    backupData("tide.csv", writeTide);
    data= $(tideForm).serialize();
   
    alert(data);
  
  $.ajax({
    type: 'POST',
    data: data,
    url: server,
    success: function(data){
      console.log(data);
      setInfo();
      //alert("success");
      clearForm('tideForm');
      
    },
    error: function(){
      console.log(data);
      alert('There was an error uploading this info');
    }
  });
  
  //return false;

}


function uploadCurrent(){

    data= $(currentForm).serialize();
   
    alert(data);
    backupData("current.csv", writeCurrent);

    $.ajax({
    type: 'POST',
    data: data,
    url: server,
    success: function(data){
      console.log(data);
      setInfo();
      //alert("success");
      clearForm('currentForm');
      
    },
    error: function(){
      console.log(data);
      alert('There was an error uploading this info');
    }
  });
  
  //return false;
}

function uploadData(fi, func, frm){
    var myFunction = func;
    var myFile = fi;
    var myForm = frm;
    

    var data= $('#'+myForm).serialize();
   
    alert(data);
    
    backupData(myFile, myFunction);

    $.ajax({
    type: 'POST',
    data: data,
    url: server,
    success: function(data){
      console.log(data);

      //alert("success");
      clearForm(myForm);
      
    },
    error: function(){
      console.log(data);
      alert('There was an error uploading this info');
    }
  });
  
  //return false;
}





