import React from "react";
import { NavLink } from 'react-router-dom'
import { useSelector } from "react-redux";

import { getImg, useResize } from "../../utils/Helper";
import styles from './Header.module.scss';
import Button from "../Button";

const headerStyle = {
    position: 'fixed',
    background: 'var(--white)',
    top: 0,
    left: 0,
    width: '100%'
}

const Header = (props) => {

    const { isMobile } = useResize()
    const { hasMembership } = useSelector(state => state.membership)
    let toggleImg = getImg('toggle.png')

    if (props.isOpenMenu) toggleImg = getImg('close.png')
    else toggleImg = getImg('toggle.png')

    const toggleMenu = () => {
        props.setIsOpenMenu(!props.isOpenMenu)
    }

    return (
        <header style={(isMobile && props.isOpenMenu) ? headerStyle : {}}>
            <div className="container">
                <div className={styles.div}>
                    <div>
                        <NavLink to="/">
                            <img className={styles.logo} src={getImg('logo.png')} alt="logo" />
                            <div>
                                {!isMobile && <div className="h5 ml_20">NFTBOOK BAZAAR</div>}
                                <div className={styles.divider}></div>
                                <div className="h6">Mint</div>
                            </div>
                        </NavLink>
                    </div>
                    <div>
                        {!isMobile && <NavLink to="/activity" activeClassName={styles.active} className="subTitle_2 mr_50">&nbsp;Activity&nbsp;</NavLink>}
                        {!isMobile && props.account && <NavLink to="/history" activeClassName={styles.active} className="subTitle_2 mr_50">&nbsp;My History&nbsp;</NavLink>}
                        {!isMobile && <Button
                            value={props.account ? props.account.substr(0, 5) + '...' + props.account.substr(38, 42) : "Connect"}
                            style={{ width: 140, height: 56 }} white
                            onClick={props.handleSetAccount} />}
                        {isMobile && <Button
                            value={props.account ? props.account.substr(0, 5) + '...' + props.account.substr(38, 42) : "Connect"}
                            style={{ width: 95, height: 32, fontSize: 12 }} white
                            onClick={props.handleSetAccount} />}
                        {hasMembership && <img className={styles.daoMember} src={getImg('dao_member.png')} alt="img" />}
                        {isMobile && <img src={toggleImg} onClick={toggleMenu} className={styles.toggle} alt="toggle" />}
                    </div>
                </div>
            </div>
            {props.isOpenMenu && <div className={styles.menu}>
                <div>
                    <div className="subTitle_2 mt_30">
                        <NavLink to="/activity" activeClassName={styles.active}
                            onClick={() => props.setIsOpenMenu(false)}>Activity</NavLink>
                    </div>
                    {props.account && <div className="subTitle_2 mt_30">
                        <NavLink to="/history" activeClassName={styles.active}
                            onClick={() => props.setIsOpenMenu(false)}>My History</NavLink>
                    </div>}
                    <div className="subTitle_2 mt_30" onClick={props.closeAccount}>Disconnect</div>
                </div>
            </div>}
        </header >
    )
}

export default Header