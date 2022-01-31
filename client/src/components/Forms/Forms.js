import Field from "./Field/Field"
import * as formActions from '../../reducer/actions/formActions';
import { BIG_BLUE_BUTTON } from "../../tailwind/tailwind";

const Forms = ({fields, submitText, dispatch, submit, canSubmit}) => {

    const fieldsKeys = Object.keys(fields);
    const inputs = fieldsKeys && fieldsKeys.map(key => {
        return (
            <Field 
                key={key} 
                label={fields[key].label} 
                inputOptions={{...fields[key]}} 
                changeText={e => dispatch({type: formActions.SET_VALUE, value: e.target.value, field: "value", inputName: e.target.name})}
            />
        );
    });
   
    return (
        <form className="flex flex-col m-auto px-10 py-5 w-full">
            {inputs}
            { canSubmit && <input type="submit" value={submitText} onClick={submit} className={BIG_BLUE_BUTTON}/> }
        </form>
    );
}

export default Forms;