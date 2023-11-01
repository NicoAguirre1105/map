package com.github.darderion.mundaneassignmentpolice.rules

import com.github.darderion.mundaneassignmentpolice.checker.rule.Rule

val RULE_SET_RU = RuleSet(
	listOf(
		RULE_OUTSIDE_FIELDS,
		RULE_LITLINK,
		RULE_SHORT_DASH,
		RULE_MEDIUM_DASH,
		RULE_LONG_DASH,
		RULE_UNSCIENTIFIC_SENTENCE,
		RULE_CLOSING_QUOTATION,
		RULE_OPENING_QUOTATION,
		RULE_MULTIPLE_LITLINKS,
		RULE_BRACKETS_LETTERS,
		RULE_CITATION,
		RULE_NO_TASKS,
		RULE_SECTION_NUMBERING_FROM_0,
		RULE_SINGLE_SUBSECTION,
		RULE_TABLE_OF_CONTENT_NUMBERS,
		RULE_SYMBOLS_IN_SECTION_NAMES,
		RULE_DISALLOWED_WORDS,
		RULE_INCORRECT_ABBREVIATION,
		RULE_SHORTENED_URLS,
		RULE_URLS_UNIFORMITY,
		RULE_ORDER_OF_REFERENCES,
		RULE_VARIOUS_ABBREVIATIONS,
		RULE_SECTIONS_ORDER,
		RULE_LOW_QUALITY_CONFERENCES,
	)
			+ RULES_SPACE_AROUND_BRACKETS
			+ RULES_SMALL_NUMBERS

)
class RuleSet(val rules: List<Rule>) {}