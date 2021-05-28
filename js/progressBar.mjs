export default function createProgressBar(val) {
  let UVVal = val;
  let barFill = (UVVal * 7.69) / 100;
  console.log(barFill);
  let bar = new ProgressBar.SemiCircle(container, {
    strokeWidth: 12,
    color: "#FFEA82",
    trailColor: "#eee",
    trailWidth: 1,
    easing: "easeInOut",
    duration: 1400,
    svgStyle: null,
    text: {
      value: "",
      alignToBottom: false,
    },
    from: { color: "#FFEA82" },
    to: { color: "#ED6A5A" },
    // Set default step function for all animate calls
    step: (state, bar) => {
      bar.path.setAttribute("stroke", state.color);
      //var value = Math.round(bar.value() * 100);
      let value = UVVal;
      if (value === 0) {
        bar.setText("");
      } else {
        bar.setText(value);
      }

      bar.text.style.color = state.color;
    },
  });
  bar.text.style.fontFamily = '"Raleway", Helvetica, sans-serif';
  bar.text.style.fontSize = "2rem";

  bar.animate(barFill); // Number from 0.0 to 1.0
}
