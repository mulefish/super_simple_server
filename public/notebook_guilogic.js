const NILL = ""
let id = NILL
let last_id = NILL;
const this_is_a_wrapper = "_WRAPPER"
const this_is_a_textarea = "_TEXTAREA"
const template = `<table border='1' >
<tr>
    <td>
        1 BASE_ID_HERE
    <td>
    <td>
        2 <button>removeFromLocalStorage</button>
    </td>
    <td>
        3 <button>removeFromPage</button>
    </td>
    <td>
        4 <button>saveToLocalStorage</button>
    </td>
</tr>
<tr >
    <td colspan="5">
        <textarea rows="30" cols="100" value="" id="REPLACE_TEXTARE_ID_HERE"></textarea>
    </td>
</tr>
</table>
`
const getNextKey = (key) => {
    if (key === undefined || key === "") {
        key = 'A'
    } else {
        if (key === 'Z' || key === 'z') {
            return String.fromCharCode(key.charCodeAt() - 25) + String.fromCharCode(key.charCodeAt() - 25); // AA or aa
        } else {
            var lastChar = key.slice(-1);
            var sub = key.slice(0, -1);
            if (lastChar === 'Z' || lastChar === 'z') {
                // If a string of length > 1 ends in Z/z,
                // increment the string (excluding the last Z/z) recursively,
                // and append A/a (depending on casing) to it
                return getNextKey(sub) + String.fromCharCode(lastChar.charCodeAt() - 25);
            } else {
                // (take till last char) append with (increment last char)
                return sub + String.fromCharCode(lastChar.charCodeAt() + 1);
            }
        }
    }
    return key;
};

function injectNewArea() {
    last_id = id;
    id = getNextKey(id)
    const wrapperId = id + this_is_a_wrapper
    const textareaId = id + this_is_a_textarea
    let wrapper = document.createElement("div")
    let x = template.replace("REPLACE_TEXTARE_ID_HERE", textareaId)
    x = x.replace("BASE_ID_HERE", id)
    wrapper.id = wrapperId
    wrapper.innerHTML = x

    document.getElementById("content").appendChild(wrapper)
}

