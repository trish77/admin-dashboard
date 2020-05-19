getOrgChart.themes.myCustomTheme = {
    size: [350, 185],
    toolbarHeight: 46,
    textPoints: [
        { x: 100, y: 50, width: 250 },
        { x: 110, y: 80, width: 240 }
    ],
    textPointsNoImage: [
        // { x: 10, y: 50, width: 350 },
        // { x: 10, y: 90, width: 350 }
        { x: 100, y: 50, width: 250 },
        { x: 110, y: 80, width: 240 }
    ],
    expandCollapseBtnRadius: 20,
    defs: '<filter id="f1" x="0" y="0" width="200%" height="200%"><feOffset result="offOut" in="SourceAlpha" dx="5" dy="5" />' +
        '<feGaussianBlur result="blurOut" in="offOut" stdDeviation="4" />' +
        '<feBlend in="SourceGraphic" in2="blurOut" mode="normal" /></filter>',
    box: '<rect x="0" y="0" height="188" width="350" rx="10" ry="10" class="myCustomTheme-box"   />',
    text: '<text text-anchor="start" width="[width]" class="get-text get-text-[index]" x="[x]" y="[y]">[text]</text>',
    tasks: '<text text-anchor="start" width="[width]" class="get-text get-text-[index]" x="110" y="110">[tasks]</text>',
    pastdue: '<text text-anchor="start" width="[width]" class="text-pastdue get-text get-text-[index]" x="110" y="135">[pastdue]</text>',
    image: '<clipPath id="personClipPath"><circle cx="50" cy="50" r="40" /></clipPath>' +
        '<image clip-path="url(#personClipPath)" xlink:href="[href]" x="10" y="10" height="80" width="80"/>',
    button: '<rect rx="5" ry="5" x="260" y="143" width="80" height="35" class="viewbtn"></rect><text class="viewbtn-text" text-anchor="middle" width="100" x="300" y="165">View</text>',
    noimage: '[noimage]',
    reporters: '[reporters]',

};
var data = [
    { id: 0, parentId: null, name: "Boss", title: "Manager", image: "", noimage: "DC", button: "<button class='btn btn-default'>Viewi</button>" },
    { id: 100, parentId: 0, name: "Co-worker", title: "Manager", image: "/content/images/avatar-default.png", button: "View" },
    { id: 200, parentId: 0, name: "Co-worker", title: "Manager", image: "/content/images/avatar-default.png", button: "View" },
    { id: 1, parentId: 0, name: "Darcy Crane", title: "Clinical Nurse Supervisorsadfsdfdsa", tasks: "17", pastdue: "3", image: "https://s3.amazonaws.com/uifaces/faces/twitter/allisongrayce/128.jpg", button: "View" },

    { id: 3, parentId: 1, name: "Michele Brown", title: "Nurse Manager - Acute Care", tasks: "3", image: "/content/images/prototype-actors/19.jpg", noimage: "DC", button: "View" },
    { id: 4, parentId: 1, name: "Nicholas Frazier", title: "Quality Coordinator (RN)", tasks: "0", compliance: 2, image: "/content/images/prototype-actors/72.jpg", button: "View" },
    { id: 5, parentId: 2, name: "Chris Horton", title: "Diabetes Educator", tasks: "1", pastdue: "1", image: "/content/images/prototype-actors/83.jpg" },
    { id: 2, parentId: 1, name: "Ella Lane", title: "Case Manager (RN)", tasks: "2", image: "/content/images/prototype-actors/76.jpg", button: "View" },
    { id: 6, parentId: 1, name: "Brad Bruno", title: "Nurse Manager - Acute Care", tasks: "3", image: "/content/images/prototype-actors/bbrune.jpg", button: "View" },
    { id: 7, parentId: 1, name: "Andrea Martinez", title: "LPN - I.V. Certified", tasks: "9", pastdue: "2", image: "/content/images/prototype-actors/78.jpg", button: "View" },
    { id: 8, parentId: 1, name: "Tanya Rivera", title: "Nurse - Staff (RN) - Acute Care", tasks: "8", image: "/content/images/prototype-actors/8.jpg", button: "View" },

    { id: 9, parentId: 1, name: "Elmer Romero", title: "Nurse - Staff (RN) - Telephone", tasks: "5", pastdue: "1", image: "/content/images/prototype-actors/98.jpg", button: "View" },
    { id: 10, parentId: 3, name: "Jon Sims", title: "Medical Assistant", tasks: "5", pastdue: "1", image: "/content/images/prototype-actors/63.jpg", secondParenId: 1, button: "View" },
    { id: 11, parentId: 3, name: "Amber McKenzie", title: "Nurse - Staff (RN)", tasks: "4", image: "/content/images/prototype-actors/8.jpg", button: "View" },
    { id: 12, parentId: 3, name: "Ava Field", title: "Nurse - Staff (RN)", tasks: "3", image: "/content/images/prototype-actors/alewis.jpg", secondParenId: 6, button: "View" },
    { id: 13, parentId: 3, name: "Evie Johnson", title: "Nurse - Staff (RN)", tasks: "3", image: "/content/images/prototype-actors/brynn.jpg", button: "View" },

    { id: 28, parentId: 4, name: "Jon Sims", title: "Medical Assistant", tasks: "5", pastdue: "1", image: "/content/images/prototype-actors/63.jpg", secondParenId: 1, button: "View" },
    { id: 29, parentId: 4, name: "Amber McKenzie", title: "Nurse - Staff (RN)", tasks: "4", image: "/content/images/prototype-actors/8.jpg", button: "View" },
    { id: 30, parentId: 4, name: "Ava Field", title: "Nurse - Staff (RN)", tasks: "3", image: "/content/images/prototype-actors/alewis.jpg", secondParenId: 6, button: "View" },
    { id: 31, parentId: 4, name: "Evie Johnson", title: "Nurse - Staff (RN)", tasks: "3", image: "/content/images/prototype-actors/brynn.jpg", button: "View" },
    { id: 32, parentId: 4, name: "Paul Shetler", title: "Nurse - Staff (RN)", tasks: "3", image: "/content/images/prototype-actors/himanshuchanda.jpg", button: "View" },
    { id: 33, parentId: 4, name: "Rebecca Francis", title: "Nurse - Staff (RN)", tasks: "3", image: "/content/images/prototype-actors/himanshuchanda.jpg" },
    { id: 34, parentId: 4, name: "Jon Sims", title: "Medical Assistant", tasks: "5", pastdue: "1", image: "/content/images/prototype-actors/63.jpg", secondParenId: 1, button: "View" },
    { id: 35, parentId: 4, name: "Amber McKenzie", title: "Nurse - Staff (RN)", tasks: "4", image: "/content/images/prototype-actors/8.jpg", button: "View" },
    { id: 36, parentId: 4, name: "Ava Field", title: "Nurse - Staff (RN)", tasks: "3", image: "/content/images/prototype-actors/alewis.jpg", secondParenId: 6, button: "View" },
    { id: 37, parentId: 4, name: "Evie Johnson", title: "Nurse - Staff (RN)", tasks: "3", image: "/content/images/prototype-actors/brynn.jpg", button: "View" },
    { id: 38, parentId: 4, name: "Paul Shetler", title: "Nurse - Staff (RN)", tasks: "3", image: "/content/images/prototype-actors/himanshuchanda.jpg", button: "View" },
    { id: 39, parentId: 4, name: "Rebecca Francis", title: "Nurse - Staff (RN)", tasks: "3", image: "/content/images/prototype-actors/himanshuchanda.jpg", button: "View" },
    { id: 40, parentId: 4, name: "Jon Sims", title: "Medical Assistant", tasks: "5", pastdue: "1", image: "/content/images/prototype-actors/63.jpg", secondParenId: 1, button: "View" },
    { id: 41, parentId: 4, name: "Amber McKenzie", title: "Nurse - Staff (RN)", tasks: "4", image: "/content/images/prototype-actors/8.jpg", button: "View" },
    { id: 42, parentId: 4, name: "Ava Field", title: "Nurse - Staff (RN)", tasks: "3", image: "/content/images/prototype-actors/alewis.jpg", secondParenId: 6, button: "View" },
    { id: 43, parentId: 4, name: "Evie Johnson", title: "Nurse - Staff (RN)", tasks: "3", image: "/content/images/prototype-actors/brynn.jpg", button: "View" },
    { id: 44, parentId: 4, name: "Paul Shetler", title: "Nurse - Staff (RN)", tasks: "3", image: "/content/images/prototype-actors/himanshuchanda.jpg", button: "View" },
    { id: 45, parentId: 4, name: "Rebecca Francis", title: "Nurse - Staff (RN)", tasks: "3", image: "/content/images/prototype-actors/himanshuchanda.jpg", button: "View" },
    { id: 46, parentId: 8, name: "Rebecca Randall", title: "Nurse - Staff (RN)", tasks: "3", image: "/content/images/prototype-actors/ladylexy.jpg", button: "View" },
    { id: 47, parentId: 8, name: "Spencer May", title: "Nurse - Staff (RN)", tasks: "3", image: "/content/images/prototype-actors/ladylexy.jpg", button: "View" },
    { id: 48, parentId: 9, name: "Max Ford", title: "Nurse - Staff (RN)", tasks: "3", image: "/content/images/prototype-actors/mtnmissy.jpg", button: "View" },
    { id: 49, parentId: 1, name: "Riley Bray", title: "Nurse - Staff (RN)", tasks: "3", image: "/content/images/prototype-actors/rhein_wein.jpg", button: "View" },
    { id: 50, parentId: 1, name: "Callum Whitehouse", title: "Nurse - Staff (RN)", tasks: "3", image: "/content/images/prototype-actors/uxceo.jpg", button: "View" },
    { id: 53, parentId: 13, name: "Evie Johnson", title: "Nurse - Staff (RN)", tasks: "3", image: "/content/images/prototype-actors/brynn.jpg", button: "View" },
    { id: 54, parentId: 13, name: "Paul Shetler", title: "Nurse - Staff (RN)", tasks: "3", image: "/content/images/prototype-actors/himanshuchanda.jpg", button: "View" },
    { id: 55, parentId: 13, name: "Rebecca Francis", title: "Nurse - Staff (RN)", tasks: "3", image: "/content/images/prototype-actors/himanshuchanda.jpg", button: "View" },
    { id: 56, parentId: 13, name: "Jon Sims", title: "Medical Assistant", tasks: "5", pastdue: "1", image: "/content/images/prototype-actors/63.jpg", secondParenId: 1, button: "View" },
    { id: 57, parentId: 13, name: "Amber McKenzie", title: "Nurse - Staff (RN)", tasks: "4", image: "/content/images/prototype-actors/8.jpg", button: "View" },
    { id: 58, parentId: 13, name: "Ava Field", title: "Nurse - Staff (RN)", tasks: "3", image: "/content/images/prototype-actors/alewis.jpg", secondParenId: 6, button: "View" },
    { id: 59, parentId: 13, name: "Evie Johnson", title: "Nurse - Staff (RN)", tasks: "3", image: "/content/images/prototype-actors/brynn.jpg", button: "View" },
    { id: 60, parentId: 13, name: "Paul Shetler", title: "Nurse - Staff (RN)", tasks: "3", image: "/content/images/prototype-actors/himanshuchanda.jpg", button: "View" },
    { id: 61, parentId: 13, name: "Rebecca Francis", title: "Nurse - Staff (RN)", tasks: "3", image: "/content/images/prototype-actors/himanshuchanda.jpg", button: "View" },
    { id: 62, parentId: 13, name: "Jon Sims", title: "Medical Assistant", tasks: "5", pastdue: "1", image: "/content/images/prototype-actors/63.jpg", secondParenId: 1, button: "View" },
    { id: 64, parentId: 50, name: "Paul Shetler", title: "Nurse - Staff (RN)", tasks: "3", image: "/content/images/prototype-actors/himanshuchanda.jpg", button: "View" },
    { id: 65, parentId: 50, name: "Rebecca Francis", title: "Nurse - Staff (RN)", tasks: "3", image: "/content/images/prototype-actors/himanshuchanda.jpg", button: "View" },
    { id: 66, parentId: 50, name: "Jon Sims", title: "Medical Assistant", tasks: "5", pastdue: "1", image: "/content/images/prototype-actors/63.jpg", secondParenId: 1, button: "View" },
    { id: 67, parentId: 50, name: "Amber McKenzie", title: "Nurse - Staff (RN)", tasks: "4", image: "/content/images/prototype-actors/8.jpg", button: "<button >Hey</button>" },
    { id: 68, parentId: 50, name: "Ava Field", title: "Nurse - Staff (RN)", tasks: "3", image: "/content/images/prototype-actors/alewis.jpg", secondParenId: 6, button: "View" },
    { id: 69, parentId: 50, name: "Evie Johnson", title: "Nurse - Staff (RN)", tasks: "3", image: "/content/images/prototype-actors/brynn.jpg", button: "View" },
    { id: 70, parentId: 50, name: "Paul Shetler", title: "Nurse - Staff (RN)", tasks: "3", image: "/content/images/prototype-actors/himanshuchanda.jpg", button: "View" },
    { id: 71, parentId: 70, name: "Rebecca Francis", title: "Nurse - Staff (RN)", tasks: "3", image: "/content/images/prototype-actors/himanshuchanda.jpg", button: "View" },
    { id: 72, parentId: 70, name: "Jon Sims", title: "Medical Assistant", tasks: "5", pastdue: "1", image: "/content/images/prototype-actors/63.jpg", secondParenId: 1, button: "View" },
    { id: 69, parentId: 50, name: "Evie Johnson", title: "Nurse - Staff (RN)", tasks: "3", image: "/content/images/prototype-actors/brynn.jpg", button: "View" },
    { id: 70, parentId: 50, name: "Paul Shetler", title: "Nurse - Staff (RN)", tasks: "3", image: "/content/images/prototype-actors/himanshuchanda.jpg", button: "View" },
    { id: 71, parentId: 47, name: "Rebecca Francis", title: "Nurse - Staff (RN)", tasks: "3", image: "/content/images/prototype-actors/himanshuchanda.jpg", button: "View" },
    { id: 72, parentId: 47, name: "Jon Sims", title: "Medical Assistant", tasks: "5", pastdue: "1", image: "/content/images/prototype-actors/63.jpg", secondParenId: 1, button: "View" },
];

var peopleElement = document.getElementById("people");
var orgChart = new getOrgChart(peopleElement, {
    theme: "myCustomTheme",
    enableGridView: true,
    primaryFields: ["name", "title", "tasks", "pastdue", "noimage", "button"],
    photoFields: ["image"],
    enableEdit: false,
    enableDetailsView: false,
    enableGridView: false,
    enablePrint: true,
    linkType: 'M',
    scale: 0.4,
    enableExportToImage: true,
    levelSeparation: 100,
    renderNodeEvent: renderNodeHandler,
    clickNodeEvent: clickHandler,
    // secondParentIdField: "secondParenId",
    // layout: getOrgChart.MIXED_HIERARCHY_RIGHT_LINKS,
    expandToLevel: 2,

    dataSource: data
});
orgChart.highlightNode("6"); //Highlight and Expand Brad Bruno
$('#people').css('width','100%');


$(document).ready(function(e) {

   $('a[title="GetOrgChart jquery plugin"]').hide();

   $(".viewbtn").bind("click", function(event){ViewProfile();});
   $(".viewbtn-text").bind("click", function(event){ViewProfile();});

   function ViewProfile() {
    location.href = "dashboard-profile-quickview.php";
   }

});


function clickHandler(sender, args) {
    // location.href = "dashboard-profile-dev-ready.php";
}


function renderNodeHandler(sender, args) {
    for (var i = 0; i < args.content.length; i++) {
        // console.log(args.content[i].indexOf("[reporters]"));

        if (args.node.children.length != 0) {
            args.content[i] = args.content[i].replace("[reporters]", '<circle cx="80" cy="80" r="20" class="reporters"></circle><text class="reporters-text" text-anchor="middle" width="100" x="80" y="85">' + args.node.children.length + '</text>');

        } else {
            args.content[i] = args.content[i].replace("[reporters]", '');
        }
        // if (args.node.data['tasks'] != -1 != -1) {

        // }
        if (args.node.data['pastdue'] !== undefined) {
            args.content[i] = args.content[i].replace("[pastdue]", args.node.data['pastdue'] + ' Past Due');
        } else {
            args.content[i] = args.content[i].replace("[pastdue]", '');
        }

        if (args.node.data['tasks'] !== undefined) {
            args.content[i] = args.content[i].replace("[tasks]", args.node.data['tasks'] + ' Tasks');
        } else {
            args.content[i] = args.content[i].replace("[tasks]", '');
        }

        if (args.node.data['noimage'] !== undefined) {
            // args.content[i] = args.content[i].replace("[tasks]", args.node.data['tasks'] + ' Tasks');
            args.content[i] = args.content[i].replace("[noimage]", '<circle cx="50" cy="50" r="40" class="noimage"></circle><text class="noimage-text" text-anchor="middle" width="400" x="50" y="65">' + args.node.data["noimage"] + '</text>');
            args.content[i] = args.content[i].replace("[image]", '');
        } else {
            args.content[i] = args.content[i].replace("[image]", args.node.data['image']);
            args.content[i] = args.content[i].replace("[noimage]", '');
        }


    }
}