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
        <form className="flex justify-center flex-col mx-10">
            {inputs}
            { canSubmit && <input type="submit" value={submitText} onClick={submit} className="bg-blue-400 text-white hover:bg-blue-500 transition cursor-pointer px-5 py-3 my-2 rounded-full"/> }
        </form>
    );
}

export default Forms;