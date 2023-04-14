import { Link } from 'react-router-dom';
import './BreadCrumbs.scss';

export type BreadCrumbsPropsType = {
  links:Array<{
    link:string,
    name:string,
    actual?:boolean
  }>
}

const BreadCrumbs = (props:BreadCrumbsPropsType) => {
  const {links} = props;
  const extendedLinks = links.map((link,index)=>{
    return link.actual ? <span key={link.name} className='bread-crumbs__link bread-crumbs__link_current'>{link.name}</span> : <Link className='bread-crumbs__link' key={link.name} to={link.link}>{link.name}</Link>
  })

  return (
    <div className="bread-crumbs">
      {extendedLinks}
    </div>
  )

}

export default BreadCrumbs;