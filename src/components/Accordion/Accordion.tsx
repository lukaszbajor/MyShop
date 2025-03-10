import styles from "./Accordion.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

interface AccordionItem {
	title: string;
	content: string;
}
interface AccordionProps {
	items: AccordionItem[];
}

export function Accordion({ items }: AccordionProps) {
	const [activeItemIndex, setActiveItem] = useState(0);
	return (
		<ul>
			{items.map((item, index) => {
				return (
					<li
						key={item.title}
						onClick={() => {
							setActiveItem(index);
						}}
					>
						<div className={styles.item}>
							<p>{item.title}</p>
							<FontAwesomeIcon
								icon={faChevronDown}
								className={activeItemIndex === index ? styles.expanded : ""}
							/>
						</div>
						{activeItemIndex === index && <p>{item.content}</p>}
					</li>
				);
			})}
		</ul>
	);
}
