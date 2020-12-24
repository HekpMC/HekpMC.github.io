let jsonUrl = "https://HekpMC.github.io/json/events.json";
let request = new XMLHttpRequest();
request.open('GET', jsonUrl);
request.responseType = 'json';
request.send();
let events;
let currentCity = 'All';
let currentDate = 'All';
request.onload = function() {//заполнение массивов эвентов и фильтров
	events = request.response;
	console.log(events);
	let eventCity = document.querySelectorAll("select")[0];
	let opt = document.createElement("option");
	opt.appendChild(document.createTextNode('All'));
	eventCity.appendChild(opt);
	for (let i=0;i<events.length;i++){//добавление фильтров город
		let dateFinded = -1;
		for (let j=0;j<eventCity.length;j++){
			if(eventCity[j].text == events[i].city){
				dateFinded = j;
			}
		}
		if (dateFinded === -1){
			let opt = document.createElement("option");
			opt.appendChild(document.createTextNode(events[i].city));
			eventCity.appendChild(opt);
		}
	}
	let eventDate = document.querySelectorAll("select")[1];
	opt = document.createElement("option");
	opt.appendChild(document.createTextNode('All'));
	eventDate.appendChild(opt);
	for (let i=0;i<events.length;i++){//добавление фильтров месяц
		let dateArr = events[i].date.split('.');
		let date = new Date(dateArr[2]+'-'+dateArr[1]+'-'+dateArr[0]);
		let dateFinded = -1;
		date = date.toLocaleString('en-US', { month: 'long'});
		for (let j=0;j<eventDate.length;j++){
			if(eventDate[j].text == date){
				dateFinded = j;
			}
		}
		if (dateFinded === -1){
			let opt = document.createElement("option");
			opt.appendChild(document.createTextNode(date));
			eventDate.appendChild(opt);
		}
	}
	changeEvents();
}
function changeCity(val){
	currentCity = val;
	changeEvents();
}
function changeDate(val){
	currentDate = val;
	changeEvents();
}
function changeEvents(){//поиск и отображение эвентов
	console.log(currentCity +' '+currentDate);
	let selectedEvents = new Array;
	for (let i=0;i<events.length;i++){
		let dateArr = events[i].date.split('.');
		let date = new Date(dateArr[2]+'-'+dateArr[1]+'-'+dateArr[0]);
		date = date.toLocaleString('en-US', { month: 'long'});
		if ((events[i].city === currentCity || 'All' === currentCity) && (date === currentDate || 'All' === currentDate)){
			selectedEvents.push(events[i]);
		}
	}
	console.log(selectedEvents);
	let eventColumns = document.querySelectorAll(".event-column");
	let columnHTML1 = '';
	let columnHTML2 = '';

	for (let i=0;i<selectedEvents.length;i++){
		if (i%2 === 0){
			let dateArr = selectedEvents[i].date.split('.');
			columnHTML1 += createEventCard(selectedEvents[i].name,dateArr[0],'.'+dateArr[1]+'.'+dateArr[2],selectedEvents[i].image);
		}
		else{
			let dateArr = selectedEvents[i].date.split('.');
			columnHTML2 += createEventCard(selectedEvents[i].name,dateArr[0],'.'+dateArr[1]+'.'+dateArr[2],selectedEvents[i].image);
		}
	}

	eventColumns[0].innerHTML=columnHTML1;
	eventColumns[1].innerHTML=columnHTML2;
	if (eventColumns[0].innerHTML===''){
		console.log('нет событий');
		eventColumns[0].innerHTML='<h2 class="title" style="margin:140px 180px;">No Events</h2>';
	}
}
function createEventCard(name,day,month,bImg){//формирование карточки эвента
  let cardHTML = '<li class="event" onclick="marked(this)" style= "background-image: url('+bImg+');">\n<ul class="square" onmouseover="dateExtCol(this)" onmouseout="dateExtCol(this)">\n<li class="day">'+day+'</li>\n<li class="date hide">'+month+'</li>\n</ul>\n<img src="img/mark.png"alt="mark" class="mark">\n<h2 class="event-title">'+name+'</h2>\n</li>\n';
	return cardHTML;
}
function marked(obj){//отметить эвент
	obj.childNodes[3].classList.toggle('hide');
}
function dateExtCol(obj){//развернуть/скрыть полную дату эвента
	obj.classList.toggle('square');
	obj.classList.toggle('square-ext');
	obj.childNodes[3].classList.toggle('hide');
}
