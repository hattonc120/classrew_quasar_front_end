export default {
  // liveURL: "https://classroomrewards.co.uk/engine",
  // mainURL: "http://localhost:8000",

  getMemoContextGraphic(context) {
    return `src/assets/${context}.png`;
  },

  // global methods
  getSubjectGraphic(subject) {
    subject = subject.toLowerCase();
    //console.log(subject);
    var retval = "";
    //return retval;
    if (subject.indexOf("art") >= 0) retval = "/images/subjectGraphics/art.gif";
    else if (subject.indexOf("computing") >= 0)
      retval = "/images/subjectGraphics/computing.gif";
    else if (subject.indexOf("drama") >= 0)
      retval = "/images/subjectGraphics/drama.gif";
    else if (subject.indexOf("english") >= 0)
      retval = "/images/subjectGraphics/english.gif";
    else if (subject.indexOf("food") >= 0)
      retval = "/images/subjectGraphics/food_technology.gif";
    else if (subject.indexOf("resistant") >= 0)
      retval = "/images/subjectGraphics/resistant_materials.gif";
    else if (subject.indexOf("french") >= 0)
      retval = "/images/subjectGraphics/french.gif";
    else if (subject.indexOf("geography") >= 0)
      retval = "/images/subjectGraphics/geography.gif";
    else if (subject.indexOf("german") >= 0)
      retval = "/images/subjectGraphics/german.gif";
    else if (subject.indexOf("history") >= 0)
      retval = "/images/subjectGraphics/history.gif";
    else if (subject.indexOf("mathematics") >= 0)
      retval = "/images/subjectGraphics/mathematics.gif";
    else if (subject.indexOf("media") >= 0)
      retval = "/images/subjectGraphics/media_studies.gif";
    else if (subject.indexOf("language") >= 0)
      retval = "/images/subjectGraphics/modern_foreign_languages.gif";
    else if (subject.indexOf("music") >= 0)
      retval = "/images/subjectGraphics/music.gif";
    else if (subject.indexOf("physical") >= 0)
      retval = "/images/subjectGraphics/physical_education.gif";
    else if (subject.indexOf("relig") >= 0)
      retval = "/images/subjectGraphics/religious_education.gif";
    else if (subject.indexOf("science") >= 0)
      retval = "/images/subjectGraphics/science.gif";
    else if (subject.indexOf("spanish") >= 0)
      retval = "/images/subjectGraphics/science.gif";
    else retval = "/images/subjectGraphics/default.gif";
    return retval;
  },

  formatDataUF(dateStr) {
    let thisDataObj = new Date(dateStr.split(" ")[0]);
    let daysToday =
      this.getDateOnlyFromDateObj(new Date()).getTime() / 1000 / 60 / 60 / 24;
    let thisDays = thisDataObj.getTime() / 1000 / 60 / 60 / 24;
    // console.log(daysToday, thisDays);
    let numDays = daysToday - thisDays;
    if (numDays == 0) {
      return "today";
    } else if (numDays == 1) {
      return "yesterday";
    } else if (numDays >= 2 && numDays <= 5) {
      return `${numDays} days ago`;
    } else return thisDataObj.toDateString().split(" ").slice(0, -1).join(" ");
  },

  getDateOnlyFromDateObj(dateObj) {
    let date =
      dateObj.getDate() < 10 ? "0" + dateObj.getDate() : dateObj.getDate();
    let month =
      dateObj.getMonth() + 1 < 10
        ? "0" + (dateObj.getMonth() + 1)
        : dateObj.getMonth();
    let year = dateObj.getFullYear(0);
    return new Date(`${month}/${date}/${year}`);
  },
};
