import { useEffect } from "react"
import { Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { formateDate } from "../../constant/helper";
import { useToaster } from "../../common/toastAlertContext";
import { API_URL } from "../../../utils/constants";

export default function Content() {
    const { register, reset, formState: { errors }, handleSubmit } = useForm();
    const { state } = useLocation()
    const navigate = useNavigate();
    const { addToast, setLoader } = useToaster();
    const Update = async (data) => {
        setLoader(true)
        try {
            const response = await fetch(`${API_URL}/contextEngine/update/${data?._id}`, {
                method: "PUT",
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const result = await response.json(); // Extract JSON data
            if (result.statusCode === 200) {
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

    const Reset = () => {
        if (state?._id) {
            reset({ ...state, nextSync: formateDate(state.nextSync) })
        }
    }
    useEffect(() => {
        Reset()
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
                            <button type='button' onClick={Reset} className="btn btn-warning float-end me-2 ">
                                Reset
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}