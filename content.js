chrome.runtime.onMessage.addListener(gotMessage);

function gotMessage(message, sender, sendResponse) {
 if (message.txt ==="sucess Assigment") {
  fetchDataAssigment()
 }else{
   
 }
}

// TODO : 
// improve queries from page ()
// Create add a quiz to calendar
// Create an HTML button "add this ..... to google callendar"


function url(str) {
  window.open(str)
}

function fetchDataAssigment(){
  // TODO: Create a button onload
  // var scele = document.getElementById("intro")
  // var button = document.createElement("button");
  // var text = document.createTextNode("Add this assigment to Google Calendar");  
  // button.style.color = '#ffffff';
  // button.style.background = '#3f51b5';
  // button.onclick = function() {url(processData(data))}
  // button.appendChild(text);
  // scele.appendChild(button);

  let counter = 0
  for (const element of document.getElementsByClassName('cell c0')) {
    if (element.innerHTML!="Due date") {
      counter+=1
    } else {
      break;
    }
  }

  var subjectindexstart = document.getElementsByTagName('span')[40].innerHTML.indexOf("]")
  var subjectindexend = document.getElementsByTagName('span')[40].innerHTML.indexOf("(")

  let data={
    subject : "["+abbreviation(document.getElementsByTagName('span')[40].innerHTML.slice(subjectindexstart+2,subjectindexend-1).replace(/-/g," ").split(" ")) + "] ",
    title : assigmentTitle(document.getElementsByTagName("h2")[0].innerHTML.split(" ")),
    dueDate : document.getElementsByClassName('cell c1 lastcol')[counter].innerHTML,
    url : location.href
  }
  url(processData(data))
}

function abbreviation(lst){
  // convert subject name to abbreviation and remove conjunction
  var res=""
  for (var i in lst){
    if (lst[i].length >0 && subjectFilter(lst[i]) == false ) {
      res+= lst[i][0]
    }  else{}
  }
  return res.toUpperCase() 
}

function assigmentTitle(lst){
  // remove all unnecessary word from assignment title
  var res=""
  for (var i in lst){
    if (lst[i].length >0 && titleFilter(lst[i]) == false ) {
      res+= lst[i]+" "
    }  else{}
  }
  return res.substring(0, res.length - 1)
}

function titleFilter(str){
  // check if str is in the blacklist
  let blacklist = ["Slot", "Pengumpulan", "Submission", "Submisi"]
  for (var i in blacklist){
    if (str.toLowerCase().includes(blacklist[i].toLowerCase())){
      return true
    }
  }
  return false
}

function subjectFilter(str){
  // check if str is in the blacklist
  let blacklist = ["genap", "gasal", "ganjil", "/", "untuk", "dan", "&" ]
  for (var i in blacklist){
    if (str.toLowerCase().includes(blacklist[i].toLowerCase())){
      return true
    }
  }
  return false
}

function processData(data){
  var url = "https://www.google.com/calendar/u/2/render?action=TEMPLATE"
  var urlDate = processTime(data.dueDate)
  var urltitle = '&text=' + data.subject + data.title.replace(/ /g,'+')
  var urlDesc = '&details=' + data.url

  url += urlDate + urltitle + urlDesc
  return url
}

function processTime(data){
  // param = dict
  // return = '&dates=' string
  let months = {
    "January":"01"
    ,"February":"02"
    ,"March":"03"
    ,"April":"04"
    ,"May":"05"
    ,"June":"06"
    ,"July":"07"
    ,"August":"08"
    ,"September":"09"
    ,"October":"10"
    ,"November":"11"
    ,"December":"12"};

  var today = new Date();
  var dateNow ={
    Year : String(today.getFullYear()),
    Month : String(today.getMonth()+1),
    sDate : String(today.getDate()),
    Hour : String(today.getHours()),
    Minute : String(today.getMinutes()),
  }

  var dayend = String(data).replace(/,/g,'').replace(':',' ').split(' ')
  convertTimeFormat(dayend);
  
  var dateEnd ={
    Year : dayend[3],
    Month : months[dayend[2]],
    sDate : dayend[1],
    Hour : dayend[4],
    Minute : dayend[5],
  }
  
  convertDigits(dateNow);
  convertDigits(dateEnd);
  
  var strdateNow = dateNow.Year + dateNow.Month + dateNow.sDate + 'T' + dateNow.Hour + dateNow.Minute + "00%2F";
  var strdateEnd = dateEnd.Year + dateEnd.Month + dateEnd.sDate + 'T' + dateEnd.Hour + dateEnd.Minute + "00";
  var urlDate = "&dates=" + strdateNow + strdateEnd;
  return urlDate
}

function convertDigits(dict){
  // Convert one digit to two digits
  for (var key in dict){
    console.log(dict)
    if ((dict[key].length)<2){
      dict[key] = "0" + String(dict[key]);
    } else {}
  }
  
}

function convertTimeFormat(list){
  // Convert 12h time to 24h time
  if (list[6]=='PM' && parseInt(list[4])!= 12){
    list[4] = String(parseInt(list[4])+12)
  } else if(list[6]=='PM' && parseInt(list[4])== 12){
    list[4] = String(12)
    list[5] = String(00)
  }
  else{}
}


