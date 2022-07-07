import { SearchProps } from "./Search.props"
import cn from "classnames"
import styles from "./Search.module.css"
import { Button } from "../Button/Button"
import { Input } from "../Input/Input"
import { useState } from "react"

export const Search = ({ className, ...props }: SearchProps): JSX.Element => {  
    const [valueSearch, setValueSearch] = useState<string>('')
    return (
       <div className={cn(className, styles.search)} {...props}>
           <Input placeholder="Поиск..." value={valueSearch} onChange={(e) => setValueSearch((e.target as HTMLInputElement).value)}/> 
           {/* <Button appearance='primary' className={styles.button}></Button> */}
       </div>
    )
}