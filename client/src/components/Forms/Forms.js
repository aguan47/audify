import Field from "./Field/Field"
import * as formActions from '../../reducer/actions/formActions';

const Forms = ({fields, submitText, dispatch, submit}) => {

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
        <form>
            {inputs}
            <input type="submit" value={submitText} onClick={submit}/>
        </form>
    );
}

export default Forms;