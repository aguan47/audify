import { BLUE_CIRCLE, GREEN_CIRCLE, RED_CIRCLE, SELECTED_CIRCLE, YELLOW_CIRCLE } from "../../tailwind/tailwind";

const colorList = {
    BLUE: {style: BLUE_CIRCLE, selected: true},
    RED: {style: RED_CIRCLE, selected: false},
    GREEN: {style: GREEN_CIRCLE, selected: false},
    YELLOW: {style: YELLOW_CIRCLE, selected: false},
}

const ColorBar = ({currentColor, setCurrentColor}) => {

    let colors = Object.keys(colorList).map(color => {
        let style = colorList[color].style;
        colorList[color].selected = currentColor === color;
        if (colorList[color].selected) style += " " + SELECTED_CIRCLE;
        return <span key={color} className={style} onClick={e => setCurrentColor(color)}>{color}</span>;
    });

    return (
        <div className="flex w-full justify-center gap-x-2 my-2">
            {colors}
        </div>
    );
}

export default ColorBar;