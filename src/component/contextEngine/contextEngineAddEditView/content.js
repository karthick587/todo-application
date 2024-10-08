import { Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { useToaster } from "../../common/toastAlertContext";
import { API_URL } from "../../../utils/constants";
import { Fragment, useEffect } from "react";
import { formateDate } from "../../constant/helper";

export default function Content() {
    const { register, reset, formState: { errors }, handleSubmit } = useForm();
    const { state } = useLocation();
    const navigate = useNavigate();
    const { addToast, setLoader } = useToaster();

    const Save = async (data) => {
        setLoader(true)
        try {
            const response = await fetch(`${API_URL}/contextEngine/todo${(state?.type == "Edit") ? `/${state?.data?._id}` : ""}`, {
                method: (state?.type === "Edit") ? "PUT" : "POST",
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const result = await response.json(); // Extract JSON data
            if ((result.statusCode === 201)||(result.statusCode === 200)) {
                navigate("/context-engine-list")
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
        reset({ ...(state.data || {name:"",goal:"",autoSync:"",nextSync:""}), nextSync: formateDate(state?.data?.nextSync) })
    }

    useEffect(() => {
        if (state?.data) {
            Reset()
        }
    }, [state])

    const isDisabled = () => {
        return state.type === "View"
    }
    return (
        <div className="content">
            <div className="content-title">
                {state?.type} Context Engine
            </div>
            <div className="content-grid">
                <form onSubmit={handleSubmit(Save)}>
                    <div className="row">
                        <div className="col-6">
                            <div className="form-group">
                                <label>Name</label>
                                <input className="form-control" disabled={isDisabled()} {...register("name", { required: "Name is required" })} />
                                {errors?.name && <span className="form-error">{errors.name.message}</span>}
                            </div>
                        </div>
                        <div className="col-6">
                            <div className="form-group">
                                <label>Goal</label>
                                <input className="form-control" disabled={isDisabled()} {...register("goal", { required: "Goal is required" })} />
                                {errors?.goal && <span className="form-error">{errors.goal.message}</span>}
                            </div>
                        </div>
                        <div className="col-6">
                            <div className="form-group">
                                <label>Auto Sync</label>
                                <Form.Check // prettier-ignore
                                    type="switch"
                                    disabled={isDisabled()}
                                    {...register("autoSync")}
                                />
                                {errors?.autoSync && <span className="form-error">{errors.autoSync.message}</span>}
                            </div>
                        </div>
                        <div className="col-6">
                            <div className="form-group">
                                <label>Next Sync</label>
                                <input className="form-control" disabled={isDisabled()} type='date' {...register("nextSync", { required: "Next Sync is required" })} />
                                {errors?.nextSync && <span className="form-error">{errors.nextSync.message}</span>}
                            </div>
                        </div>
                        <div className="w-100 mt-3">
                            {(state?.type === "View") ?
                                <div className="btn btn-success float-end "  onClick={() => navigate("/context-engine", { state: { data: state?.data, type: "Edit" } })} >Edit</div>
                                :
                                <Fragment>
                                    <button type='submit' className="btn btn-success float-end ">
                                        Submit
                                    </button>

                                    <button type='button' onClick={Reset} className="btn btn-warning float-end me-2">
                                        Reset
                                    </button>

                                </Fragment>
                            }
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}