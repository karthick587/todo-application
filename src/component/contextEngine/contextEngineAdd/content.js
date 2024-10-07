import { Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useToaster } from "../../common/toastAlertContext";
import { API_URL } from "../../../utils/constants";

export default function Content() {
    const { register, formState: { errors }, handleSubmit } = useForm();
    const navigate = useNavigate();
    const { addToast, setLoader } = useToaster();

    const Save = async (data) => {
        setLoader(true)
        try {
            const response = await fetch(`${API_URL}/contextEngine/add`, {
                method: "POST",
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const result = await response.json(); // Extract JSON data
            if (result.statusCode === 201) {
                navigate("/context-engine")
            }
            addToast(result.message);
        } catch (error) {
            console.log(error)
            addToast(error);
            // Handle error state here if necessary
        }
        setLoader(false)
    };
    return (
        <div className="content">
            <div className="content-title">
                Add Context Engine
            </div>
            <div className="content-grid">
                <form onSubmit={handleSubmit(Save)}>
                    <div className="row">
                        <div className="col-6">
                            <div className="form-group">
                                <label>Name</label>
                                <input className="form-control" {...register("name", { required: "Name is required" })} />
                                {errors?.name && <span className="form-error">{errors.name.message}</span>}
                            </div>
                        </div>
                        <div className="col-6">
                            <div className="form-group">
                                <label>Goal</label>
                                <input className="form-control" {...register("goal", { required: "Goal is required" })} />
                                {errors?.goal && <span className="form-error">{errors.goal.message}</span>}
                            </div>
                        </div>
                        <div className="col-6">
                            <div className="form-group">
                                <label>Auto Sync</label>
                                <Form.Check // prettier-ignore
                                    type="switch"
                                    {...register("autoSync", { required: "Auto Sync is required" })}
                                />
                                {errors?.autoSync && <span className="form-error">{errors.autoSync.message}</span>}
                            </div>
                        </div>
                        <div className="col-6">
                            <div className="form-group">
                                <label>Next Sync</label>
                                <input className="form-control" type='date' {...register("nextSync", { required: "Next Sync is required" })} />
                                {errors?.nextSync && <span className="form-error">{errors.nextSync.message}</span>}
                            </div>
                        </div>
                        <div className="w-100 mt-3">
                            <button type='submit' className="btn btn-success float-end ">
                                Submit
                            </button>
                        </div>

                    </div>
                </form>
            </div>
        </div>
    )
}