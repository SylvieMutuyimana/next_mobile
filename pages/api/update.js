import dbConnect from "../../utils/dbConnect";
dbConnect();

export default async function update(name, the_module, fields, req, res) {
    const { query: { id }, method, body } = req;
    
    switch (method) {
        case "PUT":
        try {
            const item = await the_module.findById(id);
            if (!item) {
                return res.status(404).json({ message: `${name} not found` });
            }
            let existing_field
            let existing_name
            Object.keys(fields).forEach(field => {
                if (body[field] !== undefined) {
                    let existing             
                    if(Array.isArray(fields[field])){
                        const check1 =fields[field][0]
                        const check2 =fields[field][1]
                        console.log("check1: ", check1)
                        console.log("check2: ", check2)
                        item[field].map(data=>{
                            body[field].map(fielditem=>{
                                const check1_field = data[check1]
                                const body1_field = fielditem[check1]
                                const check2_field = data[check2]
                                const body2_field = fielditem[check2]
                                existing = (check1_field === body1_field) && ( check2_field=== body2_field)
                                if(existing){
                                    existing_name = check1_field
                                }
                            })
                        })
                    }else{
                        const check =fields[field]
                        console.log("field: ", field)
                        console.log("check: ", check)
                        item[field].map(data=>{
                            body[field].map(fielditem=>{
                                const check_field = data[check]
                                const body_field = fielditem[check]
                                existing = (check_field === body_field)
                                if(existing){
                                    existing_name = check_field
                                }
                            })
                        })
                    }
                    console.log("existing: ", existing)
                    try {
                        if (!existing) {
                            let new_item_index = item[field].length;
                            body[field].forEach(new_item => {
                                item[field][new_item_index] = new_item;
                                console.log("new: ", item[field][new_item_index]);
                                new_item_index = new_item_index + 1;
                            });
                            console.log("all: ", item[field].length);
                        }else{
                            existing_field = field
                        }
                    } catch (error) {
                        return res.status(500).json({
                            message: `Error updating ${name}`,
                            error: error.message,
                        });
                    }
                }

            });
            if(!existing_field){
                await item.save();
                res.status(200).json({ message: `${name} updated successfully` });
            }else{
                return res.status(200).json({ message: `The specified ${existing_name} ${existing_field} exists` });
            }

        } catch (error) {
            res.status(500).json({
                message: `Error updating ${name}`,
                error: error.message,
            });
        }
        break;
        case "DELETE":
        try {
            const item = await the_module.findById(id);
            if (!item) {
                return res.status(404).json({ message: `${name}: ${id} not found` });
            }
            
            Object.keys(fields).forEach(field => {
                if (body[field] !== undefined) {
                    const index = item[field].findIndex(
                    input =>
                    Array.isArray(fields[field])
                    ? fields[field].every(
                    prop => input[prop] === body[field]
                    )
                    : input[fields[field]] === body[field]
                    );
                    
                    if (index !== -1) {
                        item[field].splice(index, 1);
                    }
                }
            });
            
            await item.save();
            
            res.status(200).json({ message: `${name}: ${id} deleted successfully` });
        } catch (error) {
            res.status(500).json({
                message: `Error deleting ${name}: ${id}`,
                error: error.message,
            });
        }
        break;
        default:
        res.status(405).json({ message: `Method ${method} not allowed` });
        break;
    }
}
