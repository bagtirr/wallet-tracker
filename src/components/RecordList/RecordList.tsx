import { FC } from "react";
import { useGetAllRecordsQuery } from "../../services/api";
import { useAppSelector } from "../../hooks/redux";
import { filterRecordsByMonth } from "../../utils/filterByMonth";
import RecordItem from "../RecordItem/RecordItem";
import Spinner from "../../layouts/Spinner/Spinner";
import ErrorMessage from "../../layouts/ErrorMessage/ErrorMessage";
import styles from "./RecordList.module.scss";

const RecordList: FC = () => {
	const { data: records = [], isLoading, isError } = useGetAllRecordsQuery();

	const { dateFilter } = useAppSelector((state) => state.preferencesSlice);

	//* Filtered Records Array by selected month
	const filteredRecords = filterRecordsByMonth(records, dateFilter);

	return (
		<ul className={styles.wrapper}>
			{isLoading && <Spinner />}
			{isError && <ErrorMessage />}

			{filteredRecords &&
				filteredRecords.map((record) => (
					<RecordItem
						key={record.id}
						record={record}
					/>
				))}
		</ul>
	);
};

export default RecordList;
