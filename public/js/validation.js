function nameValidation(value, name)
{
    var val = /^[A-Z][A-Za-z]*$/ // regular expression
    var ret = val.test(value) // check value passes regular expression
    if(!ret) // if failed validation
        addErrorToErrorList(name) // add Error
    else 
        removeErrorFromErrorList(name) // remove Error if only side panel conatines error
    return ret; 
}

function userNameValidation(value, name)
{
    var val=/^[a-zA-Z](?=.*[a-zA-Z])(.{5})/
    var ret = val.test(value)
    if(!ret)
        addErrorToErrorList(name)
    else
        removeErrorFromErrorList(name)
    return ret;
}


function passwordValidation(value, name)
{
    var val = /^[a-zA-Z](?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(.{6})/
    var ret = val.test(value)
    if(!ret)
        addErrorToErrorList(name)
    else
        removeErrorFromErrorList(name)
    
    if(name === "confirmPassword")
    {
        var pass = document.getElementById("password").value
        var errStr = "confirmPasswordMisMatch"
        if(pass!==value)
            addErrorToErrorList(errStr)
        else
            removeErrorFromErrorList(errStr)
    }
    return ret;
}