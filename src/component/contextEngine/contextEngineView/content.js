import { useEffect } from "react"
import { Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { formateDate } from "../../constant/helper";

export default function Content() {
    const { register, reset, formState: { errors }, handleSubmit } = useForm();
    const { state } = useLocation()
    const navigate=useNavigate();
    const Update = async (data) => {
        try {
            const response = await fetch(`http://localhost:3001/contextEngine/update/${data?._id}`, {
                method: "PUT",
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const result = await response.json(); // Extract JSON data
            alert(result.message)
        } catch (error) {
            console.log(error)
            alert("Error fetching data")
            // Handle error state here if necessary
        }
    };

    useEffect(() => {
        if (state?._id) {
            reset({ ...state, nextSync: formateDate(state.nextSync) })
        }
    }, [state])
    return (
        <div className="content">
            <div className="content-title">
                Update Context Engine
            </div>
            <div className="content-grid">
                <form onSubmit={handleSubmit(Update)}>
                    <div className="row">
                        <div className="col-6">
                            <div className="form-group">
                                <label>Name</label>
                                <input disabled={true} className="form-control" {...register("name", { required: "Name is required" })} />
                                {errors?.name && <span className="form-error">{errors.name.message}</span>}
                            </div>
                        </div>
                        <div className="col-6">
                            <div className="form-group">
                                <label>Goal</label>
                                <input disabled={true} className="form-control" {...register("goal", { required: "Goal is required" })} />
                                {errors?.goal && <span className="form-error">{errors.goal.message}</span>}
                            </div>
                        </div>
                        <div className="col-6">
                            <div className="form-group">
                                <label>Auto Sync</label>
                                <Form.Check // prettier-ignore
                                    disabled={true}
                                    type="switch"
                                    {...register("autoSync", { required: "Auto Sync is required" })}
                                />
                                {errors?.autoSync && <span className="form-error">{errors.autoSync.message}</span>}
                            </div>
                        </div>
                        <div className="col-6">
                            <div className="form-group">
                                <label>Next Sync</label>
                                <input disabled={true} className="form-control" type='date' {...register("nextSync", { required: "Next Sync is required" })} />
                                {errors?.nextSync && <span className="form-error">{errors.nextSync.message}</span>}
                            </div>
                        </div>
                        <div className="w-100 mt-3">
                            <button className="btn btn-success" onClick={() => navigate("/context-engine-edit", { state: state })} >Edit</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}