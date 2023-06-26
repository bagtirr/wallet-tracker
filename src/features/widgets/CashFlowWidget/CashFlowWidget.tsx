import { FC } from "react";
import useStatistics from "../../../hooks/useStatistics";

import WidgetLayout from "../../../layouts/WidgetLayout/WidgetLayout";

import styles from "./CashFlowWidget.module.scss";

const CashFlowWidget: FC = () => {
	const { getCashFlowStat } = useStatistics();
	const { expense, flow, income, maxValue } = getCashFlowStat();

	const calcBarWidth = (value: number) => {
		return maxValue > 0 ? ((100 / maxValue) * value).toFixed() : 0;
	};

	return (
		<WidgetLayout title="Cash Flow">
			<div className={styles.container}>
				<p className={styles.title}>This month</p>
				<p
					className={`${styles.amount}  ${
						flow < 0 ? " bg-red-600 " : " bg-green-400"
					}`}>
					{flow}
					<span className={styles.currency}>USD</span>
				</p>
			</div>

			<div className={styles.item}>
				<div className={styles.type}>
					<p>Income</p>
					<p className={styles.value}>
						{income}
						<span className={styles.currency}>USD</span>
					</p>
				</div>
				<div className={styles["stat-bar"]}>
					<span
						className="bg-green-400"
						style={{
							width: `${calcBarWidth(income)}%`,
						}}></span>
				</div>
			</div>
			<div className={styles.item}>
				<div className={styles.type}>
					<p>Expense</p>
					<p className={styles.value}>
						{expense}
						<span className={styles.currency}>USD</span>
					</p>
				</div>
				<div className={styles["stat-bar"]}>
					<span
						className="bg-red-500"
						style={{
							width: `${calcBarWidth(expense)}%`,
						}}></span>
				</div>
			</div>
		</WidgetLayout>
	);
};

export default CashFlowWidget;