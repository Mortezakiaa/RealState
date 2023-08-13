import styles from './MyProfilesPage.module.css'
import DashboardCard from '../module/DashboardCard'
export default function MyProfilesPage({profiles}) {
  return (
    <div>
      {profiles.length ? null : (
        <p className={styles.text}>هیچ آگهی ثبت نشده است</p>
      )}
      {profiles.map((i) => (
        <DashboardCard key={i._id} data={JSON.parse(JSON.stringify(i))} />
      ))}
    </div>
  )
}
