
import { useEffect, useState } from "react"
import { DropdownButton, Table } from "react-bootstrap";
import { CiSearch } from "react-icons/ci";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import { formateDate } from "../../constant/helper";
import { useToaster } from "../../common/toastAlertContext";
import { API_URL } from "../../../utils/constants";

export default function Content() {
    const [data, setData] = useState([])
    const [search, setSearch] = useState()
    const [filteredData, setFilteredData] = useState([])
    const navigate = useNavigate();
    const { setLoader } = useToaster();
    const getData = async () => {
        setLoader(true)
        try {
            const response = await fetch(`${API_URL}/contextEngine/todo/get`, {
                method: "GET"
            });
            const result = await response.json();
            setData(result.data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
        setLoader(false)
    };

    useEffect(() => {
        if (data.length > 0) {
            let tempData = data.filter(val =>
                !search ||
                (val.name)?.toLowerCase()?.includes(search?.toLowerCase())
            )
            setFilteredData(tempData)
        }
    }, [data, search])

    useEffect(() => {
        getData()
    }, [])

    return (
        <div className="content">
            <div className="content-title">
                Context Engine
            </div>
            <div className="content-grid">
                <div className="table-head">
                    <div className="search">
                        <CiSearch className="search-icon" />
                        <input className="form-control" onChange={(e) => setSearch(e.target.value)} />
                    </div>
                    <div>
                        <button className="btn btn-success" onClick={() => navigate("/context-engine", { state: { type: 'Add' } })}>
                            + Add
                        </button>
                    </div>
                </div>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>S.No</th>
                            <th>Name</th>
                            <th>Goal</th>
                            <th>Auto Sync</th>
                            <th>Next Sync</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredData.length > 0 ? filteredData?.map((val, index) =>
                            <tr key={val?._id}>
                                <td>{index + 1}</td>
                                <td>{val.name}</td>
                                <td>{val.goal}</td>
                                <td>{val.autoSync ? "Yes" : "No"}</td>
                                <td>{formateDate(val.nextSync)}</td>
                                <td>
                                    <DropdownButton role="button" ty className="custom-select" title={<HiOutlineDotsVertical />}>
                                        <div>
                                            <button className="btn-none" onClick={() => navigate("/context-engine", { state: { data: val, type: "Edit" } })} >Edit</button>
                                        </div>
                                        <div>
                                            <button className="btn-none" onClick={() => navigate("/context-engine", { state: { data: val, type: "View" } })}  >View</button>
                                        </div>
                                    </DropdownButton>
                                </td>
                            </tr>)
                            :
                            <tr >
                                <th colSpan={6} className="text-center">
                                    No records
                                </th>
                            </tr>
                        }
                    </tbody>
                </Table>
            </div>
        </div>
    )
}