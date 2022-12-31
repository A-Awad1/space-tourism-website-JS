let burgerIcon = document.querySelector("header .burger-icon");
let headerUl = document.querySelector("header ul");
let headerClose = document.querySelector("header ul > img");

burgerIcon.onclick = function () {
  headerUl.classList.add("show");
};

headerClose.onclick = function () {
  headerUl.classList.remove("show");
};

let pageTitle = [...document.querySelectorAll("header a")];

let destinationLi = pageTitle.filter(function (e) {
  return e.textContent.toLocaleLowerCase().includes("destination");
});

let crewLi = pageTitle.filter(function (e) {
  return e.textContent.toLocaleLowerCase().includes("crew");
});

let technologyLi = pageTitle.filter(function (e) {
  return e.textContent.toLocaleLowerCase().includes("technology");
});

let myPromise = new Promise(function (resolve, reject) {
  let req = new XMLHttpRequest();
  req.open("GET", "data.json");
  req.send();
  req.onload = function () {
    if (req.readyState === 4 && req.status === 200) {
      resolve(JSON.parse(req.responseText));
    } else {
      reject(Error("No Data Found"));
    }
  };
});
myPromise.catch(function (reject) {
  console.log(reject);
});

// Start destination
let ulShapes = document.querySelector(".ul-shapes");
let shapeImage = document.querySelector(".shape-image");
let hShape = document.querySelector(".h-shape");
let pShape = document.querySelector(".p-shape");
let distanceShape = document.querySelector(".distance span:last-of-type");
let timeShape = document.querySelector(".time span:last-of-type");

if (destinationLi.shift().classList.contains("active")) {
  myPromise.then(function (resolve) {
    resolve["destinations"].forEach(function (e) {
      let liShape = document.createElement("li");
      liShape.textContent = e.name;
      liShape.dataset.name = e.name;
      ulShapes.appendChild(liShape);
    });

    let allLi = Array.from(ulShapes.children);
    allLi[0].classList.add("active");
    let firstShape = resolve["destinations"][0];
    shapeImage.src = firstShape["images"]["png"];
    hShape.textContent = firstShape["name"];
    pShape.textContent = firstShape["description"];
    distanceShape.textContent = firstShape["distance"];
    timeShape.textContent = firstShape["travel"];

    allLi.forEach(function (el) {
      el.onclick = function () {
        allLi.forEach(function (ele) {
          ele.classList.remove("active");
        });
        this.classList.add("active");
        let clickedName = this.dataset.name;
        let clickedShape = resolve["destinations"].filter(function (element) {
          return element["name"] === clickedName;
        });
        let shapeObject = clickedShape.shift();
        shapeImage.src = shapeObject["images"]["png"];
        hShape.textContent = shapeObject["name"];
        pShape.textContent = shapeObject["description"];
        distanceShape.textContent = shapeObject["distance"];
        timeShape.textContent = shapeObject["travel"];
      };
    });
  });
}
// End destination
// Start crew
let memberJob = document.querySelector(".member-job");
let memberName = document.querySelector(".member-name");
let memberInfo = document.querySelector(".member-info");
let memberImage = document.querySelector(".member-image");
let ulMembers = document.querySelector(".ul-members");

if (crewLi.shift().classList.contains("active")) {
  myPromise.then(function (resolve) {
    let crewData = resolve["crew"];

    memberJob.textContent = crewData[0]["role"];
    memberName.textContent = crewData[0]["name"];
    memberInfo.textContent = crewData[0]["bio"];
    memberImage.src = crewData[0]["images"]["png"];

    crewData.forEach(function (e) {
      let liMember = document.createElement("li");
      liMember.dataset.name = e.name;
      ulMembers.appendChild(liMember);
    });
    let liMembers = document.querySelectorAll(".ul-members li");
    liMembers[0].classList.add("active");
    liMembers.forEach(function (memLi) {
      memLi.onclick = function () {
        liMembers.forEach(function (membLi) {
          membLi.classList.remove("active");
        });
        memLi.classList.add("active");
        crewData.forEach(function (crewE) {
          if (memLi.dataset.name === crewE["name"]) {
            memberJob.textContent = crewE["role"];
            memberName.textContent = crewE["name"];
            memberInfo.textContent = crewE["bio"];
            memberImage.src = crewE["images"]["png"];
          }
        });
      };
    });
  });
}
// End crew
// Start technology
let ulTech = document.querySelector(".ul-tech");
let techName = document.querySelector(".tech-name");
let techInfo = document.querySelector(".tech-info");
let techImg = document.querySelector(".tech-img");

if (technologyLi.shift().classList.contains("active")) {
  myPromise.then(function (resolve) {
    let techData = resolve["technology"];

    techName.textContent = techData[0]["name"];
    techInfo.textContent = techData[0]["description"];
    techImg.dataset.srcPort = techData[0]["images"]["portrait"];
    techImg.dataset.srcLand = techData[0]["images"]["landscape"];

    function imgSize() {
      if (window.getComputedStyle(techImg)["order"] === "-1") {
        techImg.src = techImg.dataset.srcLand;
      } else {
        techImg.src = techImg.dataset.srcPort;
      }
    }

    imgSize();
    window.onresize = imgSize;

    techData.forEach(function (e) {
      let liTech = document.createElement("li");
      liTech.dataset.name = e.name;
      ulTech.appendChild(liTech);
    });

    let liTechs = document.querySelectorAll(".ul-tech li");
    liTechs[0].classList.add("active");
    liTechs.forEach(function (techLi) {
      techLi.onclick = function () {
        liTechs.forEach(function (techLi) {
          techLi.classList.remove("active");
        });
        techLi.classList.add("active");
        techData.forEach(function (techE) {
          if (techLi.dataset.name === techE["name"]) {
            techName.textContent = techE["name"];
            techInfo.textContent = techE["description"];
            techImg.dataset.srcPort = techE["images"]["portrait"];
            techImg.dataset.srcLand = techE["images"]["landscape"];
            imgSize();
          }
        });
      };
    });
  });
}

// End technology
