import Validators from "./Validators";

const ValidatorSubmit = (form, objs) =>{
    const arr = []
    for (let i = 0; i < objs.length ; i++) {
        if (objs[i] !== null){
            const a = Validators(form,objs[i], objs[i].value)
            console.log(a)
            if (a.name !== "") {
                const input = form.querySelector(`#${objs[i].id}`);
                console.log(input)
                input.focus();
                arr.push(a.name);
                break
            } 
        }
    }
    return arr.length === 0;
}

export default ValidatorSubmit