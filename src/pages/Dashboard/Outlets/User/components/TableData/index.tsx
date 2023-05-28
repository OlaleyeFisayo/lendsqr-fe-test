import more from "../../../../../../assets/svg/more.svg";
import "./index.scss";

export default function TableData() {
  return (
    <>
      <tr className="data">
        <td>LendSqr</td>
        <td>Adedeji</td>
        <td>adedeji@lendsqr.com</td>
        <td>08078903721</td>
        <td>May 15, 2020 10:00 AM</td>
        <td>inactive</td>
        <td>
          <img src={more} alt="more button" />
        </td>
      </tr>
    </>
  );
}
