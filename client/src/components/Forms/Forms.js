import Field from "./Field/Field"
import * as formActions from '../../reducer/actions/formActions';

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
            { canSubmit && <input type="submit" value={submitText} onClick={submit} className="bg-primary-btn text-white hover:bg-secondary-btn transition cursor-pointer px-5 py-3 my-2 rounded-full font-bold"/> }
        </form>
    );
}

export default Forms;